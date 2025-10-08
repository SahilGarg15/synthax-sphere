import { motion } from 'framer-motion';
import { Calendar, Users, MessageSquare, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function MentorDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Role-based access control
  useEffect(() => {
    if (!user || user.role !== 'mentor') {
      toast.error('Access denied! Mentor privileges required.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleJoinSession = (studentName: string, topic: string) => {
    toast.success(`Joining session with ${studentName} about ${topic}...`);
    // Future: Open video call or meeting room
  };

  const handleRespond = (menteeName: string) => {
    toast.success(`Opening chat with ${menteeName}...`);
    // Future: Open messaging interface
  };

  const handleSchedule = (menteeName: string) => {
    toast.success(`Scheduling session with ${menteeName}...`);
    // Future: Open calendar scheduling interface
  };

  const handleViewAll = (section: string) => {
    toast.info(`Viewing all ${section}...`);
    // Future: Navigate to full list page
  };

  const handleOpenCalendar = () => {
    toast.success('Opening your mentor calendar...');
    // Future: Open full calendar view
  };

  if (!user || user.role !== 'mentor') {
    return null; // Don't render anything while redirecting
  }

  const upcomingSessions = [
    { id: 1, student: 'Sahil Kumar', topic: 'React Hooks Deep Dive', time: '2:00 PM Today' },
    { id: 2, student: 'Anita Desai', topic: 'JavaScript Async Patterns', time: '4:30 PM Today' },
    { id: 3, student: 'Vikram Joshi', topic: 'CSS Grid Mastery', time: '10:00 AM Tomorrow' },
  ];

  const menteeRequests = [
    { id: 1, name: 'Priya Sharma', message: 'Need help with TypeScript generics', time: '2 hours ago' },
    { id: 2, name: 'Rahul Verma', message: 'Question about React performance', time: '5 hours ago' },
  ];

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
            Welcome, <span className="gradient-text">{user?.name}!</span> 🎓
          </h1>
          <p className="text-muted-foreground">Let's build together — session scheduled — ready to inspire? 🚀</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Active Mentees', value: '12', color: 'text-primary' },
            { icon: Calendar, label: 'Sessions This Week', value: '8', color: 'text-accent' },
            { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-primary' },
            { icon: Clock, label: 'Total Hours', value: '142h', color: 'text-accent' },
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-glow h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleViewAll('sessions')}>
                    View All
                  </Button>
                </div>
                <CardDescription>Your scheduled mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                      <div>
                        <p className="font-medium">{session.student}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{session.time}</p>
                      <Button 
                        variant="glow" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => handleJoinSession(session.student, session.topic)}
                      >
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Mentee Requests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="card-glow h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mentee Requests</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleViewAll('requests')}>
                    View All
                  </Button>
                </div>
                <CardDescription>New questions and session requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {menteeRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary" />
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-xs text-muted-foreground">{request.time}</p>
                        </div>
                      </div>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleRespond(request.name)}
                      >
                        Respond
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleSchedule(request.name)}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="neon" className="w-full" onClick={handleOpenCalendar}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Open Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
