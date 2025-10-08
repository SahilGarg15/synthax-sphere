import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Award, Clock, ChevronRight, Trophy, Target, Flame, Zap, Pin, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { getCourses, getUserProgress, getNextLesson } from '@/api/courses';
import Navbar from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Course, CourseProgress } from '@/types';

export default function LearnerDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWidget, setShowWidget] = useState(true);
  const [widgetPinned, setWidgetPinned] = useState(false);

  // Role-based access control
  useEffect(() => {
    if (!user || user.role !== 'learner') {
      toast.error('Access denied! Learner account required.');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Only load data if user has correct role
    if (!user || user.role !== 'learner') return;

    async function loadData() {
      try {
        const [coursesData, progressData] = await Promise.all([
          getCourses(),
          getUserProgress()
        ]);
        setCourses(coursesData);
        setProgress(progressData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (!user || user.role !== 'learner') {
    return null; // Don't render anything while redirecting
  }

  // Get enrolled courses with progress
  const enrolledCourses = courses.filter(course => 
    progress.some(p => p.courseId === course.id)
  );

  // Calculate total hours (mock calculation)
  const totalHours = Math.round(enrolledCourses.length * 12 + Math.random() * 8);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}!</span> 👋
          </h1>
          <p className="text-muted-foreground">Ready to code something brilliant today?</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: TrendingUp, label: 'Streak', value: `${user?.streak || 0} days`, color: 'text-primary' },
            { icon: BookOpen, label: 'Active Courses', value: '2', color: 'text-accent' },
            { icon: Trophy, label: 'Badges', value: '5', color: 'text-primary' },
            { icon: Clock, label: 'Hours Learned', value: '24h', color: 'text-accent' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-glow-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Link to="/courses">
              <Button variant="ghost">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.slice(0, 2).map((course, index) => {
              const courseProgress = progress.find(p => p.courseId === course.id);
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="card-glow-hover">
                    <div 
                      className="h-32 bg-gradient-to-br from-primary to-accent rounded-t-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${course.thumbnail})` }}
                    />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </div>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{courseProgress?.progress || 0}%</span>
                          </div>
                          <Progress value={courseProgress?.progress || 0} className="h-2" />
                        </div>
                        <Link to={`/courses/${course.id}`}>
                          <Button variant="default" className="w-full group">
                            Continue Learning
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4">Recent Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {user?.badges?.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-glow-hover border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Widget */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed ${widgetPinned ? 'top-24 right-4' : 'bottom-4 right-4'} z-50 w-80`}
          >
            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Daily Tips
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setWidgetPinned(!widgetPinned)}
                    >
                      <Pin className={`h-3 w-3 ${widgetPinned ? 'text-primary' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setShowWidget(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="font-medium mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Quick Tip
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Practice coding for at least 30 minutes daily to maintain your streak! 🔥
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Keyboard Shortcuts:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Next Lesson</span>
                      <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span>Previous Lesson</span>
                      <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span>Mark Complete</span>
                      <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Enter</kbd>
                    </div>
                  </div>
                </div>

                {enrolledCourses.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="font-medium mb-2">Next Recommended:</p>
                    <Link to={`/courses/${enrolledCourses[0].id}`}>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <BookOpen className="h-3 w-3 mr-2" />
                        {enrolledCourses[0].title}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
