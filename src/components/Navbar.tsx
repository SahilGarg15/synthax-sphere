import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Moon, Sun, Menu, Code2 } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();

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
            <span className="text-xl font-bold gradient-text">CodeCraft</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/#courses" className="text-foreground/80 hover:text-primary transition-colors">
              Courses
            </Link>
            <Link to="/#mentorship" className="text-foreground/80 hover:text-primary transition-colors">
              Mentorship
            </Link>
            <Link to="/community" className="text-foreground/80 hover:text-primary transition-colors">
              Community
            </Link>
            <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors">
              Blog
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

            {isAuthenticated ? (
              <Link to={`/dashboard/${user?.role}`}>
                <Button variant="default">Dashboard</Button>
              </Link>
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
    </motion.nav>
  );
}
