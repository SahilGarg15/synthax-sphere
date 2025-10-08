// Core Types for Synthax Sphere

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'mentor' | 'admin';
  avatar?: string;
  bio?: string;
  streak?: number;
  badges?: Badge[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  totalStudents: number;
  tags: string[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'code' | 'quiz';
  duration: string;
  content: string;
  codeTemplate?: string;
  language?: string;
  completed?: boolean;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  currentLesson: string;
  progress: number;
  lastAccessedAt: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  totalSessions: number;
  availability: string[];
}

export interface MentorshipRequest {
  id: string;
  menteeId: string;
  menteeName: string;
  mentorId: string;
  topic: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  scheduledAt?: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  upvotes: number;
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  reactions: { [key: string]: number };
  comments: Comment[];
  createdAt: string;
  readTime: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'course' | 'mentor' | 'forum' | 'system' | 'community' | 'badge' | 'mentorship';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}
