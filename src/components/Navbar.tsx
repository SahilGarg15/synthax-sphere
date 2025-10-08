import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Moon, Sun, Menu, Code2, Bell } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';
import NotificationCenter from './NotificationCenter';
import { mockNotifications } from '@/data/mockData';
import type { Notification } from '@/types';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize notifications from localStorage or mock data
  useEffect(() => {
    const stored = localStorage.getItem('synthax_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem('synthax_notifications', JSON.stringify(mockNotifications));
    }
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const notificationTypes: Notification['type'][] = [
        'course',
        'community',
        'badge',
        'mentorship',
        'system',
      ];
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'user-1',
        type: randomType,
        title: getRandomTitle(randomType),
        message: getRandomMessage(randomType),
        read: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('synthax_notifications', JSON.stringify(updated));
        return updated;
      });
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  const getRandomTitle = (type: Notification['type']) => {
    const titles = {
      course: [
        'New lesson available',
        'Course updated',
        'Assignment due soon',
        'You completed a module!',
      ],
      community: [
        'New reply to your post',
        'Someone mentioned you',
        'Your post was upvoted',
        'New comment on your post',
      ],
      badge: ['New badge earned!', 'Achievement unlocked!', 'Milestone reached!'],
      mentorship: [
        'Mentor session scheduled',
        'Mentor responded',
        'New mentorship request',
        'Session reminder',
      ],
      system: ['System maintenance', 'New features', 'Important update', 'Account activity'],
    };
    const list = titles[type] || titles.system;
    return list[Math.floor(Math.random() * list.length)];
  };

  const getRandomMessage = (type: Notification['type']) => {
    const messages = {
      course: [
        'A new lesson has been added to your course.',
        'Check out the latest updates in your enrolled courses.',
        'Your assignment is due in 2 days.',
        'Congratulations on completing this module!',
      ],
      community: [
        'John Doe replied to your discussion post.',
        'You were mentioned in a community discussion.',
        'Your post received 10 upvotes!',
        'New comment on: "Best practices for React"',
      ],
      badge: [
        'You earned the "Code Warrior" badge!',
        'Achievement unlocked: 7-day streak!',
        'You reached 100 completed lessons!',
      ],
      mentorship: [
        'Your session with Dr. Alex is scheduled for tomorrow.',
        'Your mentor sent you a message.',
        'New mentorship request from Sarah.',
        'Your session starts in 1 hour.',
      ],
      system: [
        'Scheduled maintenance on Sunday 2AM-4AM.',
        'New features: Dark mode improvements!',
        'Your password was recently changed.',
        'Security update available.',
      ],
    };
    const list = messages[type] || messages.system;
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem('synthax_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem('synthax_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem('synthax_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Code2 className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            <span className="text-xl font-bold gradient-text">CodeTeach</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-foreground/80 hover:text-primary transition-colors">
              Courses
            </Link>
            <Link to="/mentorship" className="text-foreground/80 hover:text-primary transition-colors">
              Mentorship
            </Link>
            <Link to="/playground" className="text-foreground/80 hover:text-primary transition-colors">
              Playground
            </Link>
            <Link to="/community" className="text-foreground/80 hover:text-primary transition-colors">
              Community
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center"
                  >
                    <span className="text-[10px] text-white font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </motion.div>
                )}
              </Button>
            )}

            {isAuthenticated ? (
              <>
                <Link to={`/dashboard/${user?.role}`}>
                  <Button variant="default">Dashboard</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    useAuthStore.getState().logout();
                    setNotifications([]);
                    localStorage.removeItem('synthax_notifications');
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
      />
    </motion.nav>
  );
}
