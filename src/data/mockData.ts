// Mock data for the LMS

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  thumbnail: string;
  progress?: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  duration: string;
  completed?: boolean;
  content?: string;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  reviews: number;
  bio: string;
}

export interface ForumPost {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  replies: number;
  createdAt: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript from variables to async programming',
    instructor: 'Priya Singh',
    level: 'beginner',
    duration: '8 hours',
    thumbnail: '',
    progress: 45,
    modules: [
      {
        id: 'm1',
        title: 'Getting Started',
        duration: '1 hour',
        completed: true,
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to JavaScript',
            type: 'video',
            duration: '15 min',
            completed: true,
          },
          {
            id: 'l2',
            title: 'Setting up your environment',
            type: 'reading',
            duration: '10 min',
            completed: true,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Variables and Data Types',
        duration: '2 hours',
        lessons: [
          {
            id: 'l3',
            title: 'Understanding Variables',
            type: 'video',
            duration: '20 min',
            completed: true,
          },
          {
            id: 'l4',
            title: 'Practice: Variable Declaration',
            type: 'exercise',
            duration: '30 min',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Learn Python programming with focus on data analysis and visualization',
    instructor: 'Rahul Verma',
    level: 'intermediate',
    duration: '12 hours',
    thumbnail: '',
    progress: 0,
    modules: [
      {
        id: 'm3',
        title: 'Python Basics',
        duration: '3 hours',
        lessons: [
          {
            id: 'l5',
            title: 'Python Syntax',
            type: 'video',
            duration: '25 min',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'React Advanced Patterns',
    description: 'Deep dive into React hooks, context, and performance optimization',
    instructor: 'Anjali Sharma',
    level: 'advanced',
    duration: '15 hours',
    thumbnail: '',
    progress: 0,
    modules: [
      {
        id: 'm4',
        title: 'Advanced Hooks',
        duration: '4 hours',
        lessons: [
          {
            id: 'l6',
            title: 'Custom Hooks',
            type: 'video',
            duration: '30 min',
            completed: false,
          },
        ],
      },
    ],
  },
];

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Priya Singh',
    avatar: '',
    expertise: ['JavaScript', 'React', 'Node.js'],
    rating: 4.9,
    reviews: 127,
    bio: 'Full-stack developer with 8+ years of experience teaching web development',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    avatar: '',
    expertise: ['Python', 'Data Science', 'Machine Learning'],
    rating: 4.8,
    reviews: 95,
    bio: 'Data scientist passionate about making ML accessible to everyone',
  },
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    author: 'Sahil Kumar',
    authorAvatar: '',
    title: 'How to handle async/await in React?',
    content: 'I\'m struggling with proper async/await patterns in React components. Any tips?',
    tags: ['JavaScript', 'React', 'Async'],
    upvotes: 24,
    replies: 8,
    createdAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    author: 'Anita Desai',
    authorAvatar: '',
    title: 'Best practices for Python virtual environments',
    content: 'What\'s the recommended way to manage dependencies in Python projects?',
    tags: ['Python', 'DevOps'],
    upvotes: 18,
    replies: 5,
    createdAt: '2024-01-19T14:20:00Z',
  },
  {
    id: '3',
    author: 'Vikram Joshi',
    authorAvatar: '',
    title: 'CSS Grid vs Flexbox - when to use what?',
    content: 'Can someone explain the use cases for Grid vs Flexbox with examples?',
    tags: ['CSS', 'Web Design'],
    upvotes: 32,
    replies: 12,
    createdAt: '2024-01-18T09:15:00Z',
  },
  {
    id: '4',
    author: 'Neha Kapoor',
    authorAvatar: '',
    title: 'TypeScript generics explained simply',
    content: 'Looking for a beginner-friendly explanation of TypeScript generics',
    tags: ['TypeScript', 'Tutorial'],
    upvotes: 45,
    replies: 15,
    createdAt: '2024-01-17T16:45:00Z',
  },
  {
    id: '5',
    author: 'Arjun Patel',
    authorAvatar: '',
    title: 'Git workflow for team collaboration',
    content: 'What\'s your team\'s Git branching strategy? Feature branches or trunk-based?',
    tags: ['Git', 'Collaboration'],
    upvotes: 29,
    replies: 10,
    createdAt: '2024-01-16T11:00:00Z',
  },
];
