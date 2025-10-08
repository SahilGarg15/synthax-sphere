import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Users, Zap, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Hero3D from '@/components/Hero3D';
import Navbar from '@/components/Navbar';
import { mockCourses } from '@/data/mockData';
import { useAuthStore } from '@/stores/authStore';

export default function Landing() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master Coding with{' '}
              <span className="gradient-text">Expert Mentorship</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interactive courses, live coding sessions, and a thriving community to accelerate your programming journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? "/courses" : "/signup"}>
                <Button variant="hero" size="xl" className="group">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="neon" size="xl">
                  Explore Courses
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
            >
              <div>
                <div className="text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Learners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Expert Mentors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Courses</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose CodeTeach?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to become a professional developer</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Interactive Coding',
                description: 'Practice in real-time with our built-in code editor and instant feedback',
              },
              {
                icon: Users,
                title: 'Expert Mentors',
                description: 'Learn from industry professionals with years of real-world experience',
              },
              {
                icon: Zap,
                title: 'Fast-Track Learning',
                description: 'Structured curriculum designed to get you job-ready in months',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="card-glow-hover h-full">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground">Start your coding journey with our most popular courses</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-glow-hover h-full">
                  <div className="h-48 bg-gradient-to-br from-primary to-accent rounded-t-lg" />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {course.level}
                      </span>
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">by {course.instructor}</span>
                      <Button variant="glow" size="sm">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section id="mentorship" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">One-on-One Mentorship</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get personalized guidance from experienced developers. Schedule sessions, get code reviews, and accelerate your learning with expert feedback.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized learning paths',
                  'Live coding sessions',
                  'Project reviews and feedback',
                  'Career guidance and interview prep',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/mentorship">
                <Button variant="hero" size="lg">
                  Find Your Mentor
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="card-glow">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-2xl">95%</CardTitle>
                    <CardDescription>Success Rate</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="card-glow mt-8">
                  <CardHeader>
                    <Users className="h-8 w-8 text-accent mb-2" />
                    <CardTitle className="text-2xl">500+</CardTitle>
                    <CardDescription>Active Mentors</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="card-glow">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-2xl">10K+</CardTitle>
                    <CardDescription>Sessions Completed</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="card-glow mt-8">
                  <CardHeader>
                    <Award className="h-8 w-8 text-accent mb-2" />
                    <CardTitle className="text-2xl">4.9/5</CardTitle>
                    <CardDescription>Average Rating</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-glow rounded-2xl p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to start your coding journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are mastering their craft with CodeTeach LMS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="neon" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CodeTeach LMS. Built with passion for developers.</p>
        </div>
      </footer>
    </div>
  );
}
