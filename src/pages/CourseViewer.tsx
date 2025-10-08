import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Play, BookOpen, Code, ChevronDown, Home, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Navbar from '@/components/Navbar';
import { mockCourses } from '@/data/mockData';
import { toast } from 'sonner';
import CodePlayground from '@/components/CodePlayground';
import type { Lesson } from '@/types';

export default function CourseViewer() {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const [selectedLesson, setSelectedLesson] = useState(course?.modules[0]?.lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Update selected lesson when course changes
  useEffect(() => {
    if (course && !selectedLesson) {
      setSelectedLesson(course.modules[0]?.lessons[0]);
    }
  }, [course, selectedLesson]);

  // Get all lessons in order for navigation
  const allLessons = course?.modules.flatMap(module => module.lessons) || [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === selectedLesson?.id);
  const hasNextLesson = currentLessonIndex < allLessons.length - 1;
  const hasPrevLesson = currentLessonIndex > 0;

  // Calculate progress (handle division by zero)
  const progressPercentage = allLessons.length > 0 
    ? Math.round((completedLessons.size / allLessons.length) * 100) 
    : 0;

  // Celebration when course is completed
  useEffect(() => {
    if (progressPercentage === 100 && completedLessons.size === allLessons.length && allLessons.length > 0) {
      toast.success('🎉 Congratulations!', {
        description: 'You have completed the entire course!',
        duration: 5000,
      });
    }
  }, [progressPercentage, completedLessons.size, allLessons.length]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-24">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Course not found</h1>
          <p className="text-muted-foreground mb-6">The course ID "{courseId}" doesn't exist</p>
          <Link to="/courses">
            <Button variant="default">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
        toast.info('Lesson marked as incomplete');
      } else {
        newSet.add(lessonId);
        toast.success('🎉 Lesson completed!', {
          description: 'Keep up the great work!',
        });
      }
      return newSet;
    });
  };

  const goToNextLesson = () => {
    if (hasNextLesson) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      setSelectedLesson(nextLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.info(`Now viewing: ${nextLesson.title}`);
    }
  };

  const goToPrevLesson = () => {
    if (hasPrevLesson) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      setSelectedLesson(prevLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.info(`Now viewing: ${prevLesson.title}`);
    }
  };

  const getCurrentModule = () => {
    return course?.modules.find(module => 
      module.lessons.some(lesson => lesson.id === selectedLesson?.id)
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play;
      case 'reading':
        return BookOpen;
      case 'code':
        return Code;
      case 'quiz':
        return Award;
      default:
        return Circle;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar - Course Navigation */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-80 border-r border-border bg-card/50 h-screen sticky top-16 overflow-y-auto"
          >
            <div className="p-6 border-b border-border">
              <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Back to Courses
              </Link>
              <h2 className="font-bold text-lg mb-2">{course.title}</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground pt-2">
                  <span>{completedLessons.size} of {allLessons.length} lessons</span>
                  <span>{allLessons.length - completedLessons.size} remaining</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {course.modules.map((module) => (
                <Collapsible key={module.id} defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-lg transition-colors group">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      <span className="font-medium text-sm">{module.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{module.lessons.length} lessons</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1 mt-1">
                    {module.lessons.map((lesson) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      const isCompleted = completedLessons.has(lesson.id);
                      const isActive = selectedLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-primary/10 border border-primary/50'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <LessonIcon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className="flex-1 text-left">
                            <p className={`text-sm ${isActive ? 'font-medium' : ''}`}>{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLesson?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                {selectedLesson ? (
                  <>
                    {/* Breadcrumb Navigation */}
                    <Breadcrumb className="mb-6">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to="/" className="flex items-center gap-1">
                              <Home className="h-3 w-3" />
                              Home
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to="/courses">Courses</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to={`/courses/${courseId}`}>{course.title}</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{getCurrentModule()?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mb-6">
                      <h1 className="text-3xl font-bold mb-2">{selectedLesson.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize flex items-center gap-1">
                          {(() => {
                            const Icon = getLessonIcon(selectedLesson.type);
                            return <Icon className="h-4 w-4" />;
                          })()}
                          {selectedLesson.type}
                        </span>
                        <span>•</span>
                        <span>{selectedLesson.duration}</span>
                      </div>
                    </div>

                  {selectedLesson.type === 'video' && (
                    <Card className="mb-6 card-glow">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Play className="h-20 w-20 text-primary" />
                      </div>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Video Content</h3>
                        <p className="text-muted-foreground">
                          This is a simulated video player. In production, integrate with your video hosting service.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedLesson.type === 'reading' && (
                    <Card className="mb-6 card-glow">
                      <CardHeader>
                        <CardTitle>Lesson Content</CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground">
                          This is where your reading content would appear. You can include text, images, code snippets, and more.
                        </p>
                        <h3 className="text-lg font-semibold mt-6 mb-3">Key Concepts</h3>
                        <ul className="space-y-2">
                          <li>Understanding the fundamentals</li>
                          <li>Practical applications</li>
                          <li>Best practices and patterns</li>
                          <li>Common pitfalls to avoid</li>
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {selectedLesson.type === 'code' && (
                    <Card className="mb-6 card-glow">
                      <CardHeader>
                        <CardTitle>Coding Exercise</CardTitle>
                        <CardDescription>
                          Practice your skills with this interactive coding challenge
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CodePlayground lessonId={selectedLesson.id} />
                      </CardContent>
                    </Card>
                  )}

                  {selectedLesson.type === 'quiz' && (
                    <Card className="mb-6 card-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Knowledge Check Quiz
                        </CardTitle>
                        <CardDescription>
                          Test your understanding of the concepts covered
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="prose prose-invert max-w-none">
                        <div className="bg-muted/50 p-6 rounded-lg">
                          <p className="text-muted-foreground mb-4">
                            Quiz component would be rendered here with multiple choice questions, 
                            code challenges, and instant feedback.
                          </p>
                          <Button variant="hero" className="w-full">Start Quiz</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPrevLesson}
                      disabled={!hasPrevLesson}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Lesson
                    </Button>

                    <Button
                      variant={completedLessons.has(selectedLesson.id) ? 'outline' : 'hero'}
                      onClick={() => toggleLessonComplete(selectedLesson.id)}
                    >
                      {completedLessons.has(selectedLesson.id) ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Completed
                        </>
                      ) : (
                        'Mark as Complete'
                      )}
                    </Button>

                    <Button
                      variant="default"
                      onClick={goToNextLesson}
                      disabled={!hasNextLesson}
                    >
                      Next Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>No Lesson Selected</CardTitle>
                      <CardDescription>
                        Select a lesson from the sidebar to begin learning
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        This course has {course.modules.length} modules with {allLessons.length} lessons total.
                        Click on any lesson in the sidebar to get started!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
