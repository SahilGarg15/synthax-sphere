import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { month: 'Jan', users: 400, revenue: 2400 },
  { month: 'Feb', users: 600, revenue: 3600 },
  { month: 'Mar', users: 800, revenue: 4800 },
  { month: 'Apr', users: 1000, revenue: 6000 },
  { month: 'May', users: 1200, revenue: 7200 },
  { month: 'Jun', users: 1500, revenue: 9000 },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Role-based access control
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Access denied! Admin privileges required.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleManageUsers = () => {
    toast.success('Opening User Management...');
    // Future: Navigate to user management page
  };

  const handleManageCourses = () => {
    toast.success('Opening Course Management...');
    // Future: Navigate to course management page
  };

  const handleViewAnalytics = () => {
    toast.info('Analytics dashboard is already displayed below');
    // Smooth scroll to analytics section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (!user || user.role !== 'admin') {
    return null; // Don't render anything while redirecting
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
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your platform and monitor growth</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Total Users', value: '50,247', change: '+12.3%', color: 'text-primary' },
            { icon: BookOpen, label: 'Active Courses', value: '1,024', change: '+5.2%', color: 'text-accent' },
            { icon: TrendingUp, label: 'Completion Rate', value: '87%', change: '+3.1%', color: 'text-primary' },
            { icon: DollarSign, label: 'Revenue', value: '$124K', change: '+18.7%', color: 'text-accent' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-glow-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="users">User Growth</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly active users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue">
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-glow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage platform content and users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="default" className="h-20" onClick={handleManageUsers}>
                  <Users className="mr-2 h-5 w-5" />
                  Manage Users
                </Button>
                <Button variant="default" className="h-20" onClick={handleManageCourses}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Manage Courses
                </Button>
                <Button variant="default" className="h-20" onClick={handleViewAnalytics}>
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
