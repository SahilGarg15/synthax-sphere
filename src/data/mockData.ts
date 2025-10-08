import type { 
  User, 
  Course, 
  Mentor, 
  ForumPost, 
  BlogArticle, 
  Notification, 
  CourseProgress,
  MentorshipRequest 
} from '@/types';
import { mockBlogArticles } from './blogArticlesData';

// Mock Users for different roles
export const mockUser: User = {
  id: 'user-1',
  name: 'Sahil Garg',
  email: 'sahil@synthaxsphere.com',
  role: 'learner',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil',
  bio: 'Passionate about learning new technologies and building cool projects!',
  streak: 12,
  badges: [
    {
      id: 'badge-1',
      name: 'Early Bird',
      description: 'Completed first course',
      icon: '🎓',
      earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'badge-2',
      name: 'Code Warrior',
      description: '50 coding challenges completed',
      icon: '⚔️',
      earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'badge-3',
      name: '7-Day Streak',
      description: 'Maintained 7-day learning streak',
      icon: '🔥',
      earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockMentorUser: User = {
  id: 'mentor-1',
  name: 'Dr. Priya Sharma',
  email: 'priya@synthaxsphere.com',
  role: 'mentor',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  bio: 'Senior Software Engineer with 10+ years of experience. Passionate about mentoring and helping developers grow.',
  streak: 0,
  badges: [],
  joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockAdminUser: User = {
  id: 'admin-1',
  name: 'Rajesh Kumar',
  email: 'admin@synthaxsphere.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  bio: 'Platform Administrator - Managing Synthax Sphere and ensuring the best learning experience for everyone.',
  streak: 0,
  badges: [],
  joinedAt: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Modern JavaScript Mastery',
    description: 'Master modern JavaScript from fundamentals to advanced concepts including ES6+, async/await, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
    instructor: 'Dr. Emily Chen',
    duration: '12 weeks',
    level: 'intermediate',
    rating: 4.8,
    totalStudents: 15420,
    tags: ['JavaScript', 'ES6+', 'Web Development', 'Frontend'],
    modules: [
      {
        id: 'module-1',
        title: 'JavaScript Fundamentals',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Variables and Data Types',
            type: 'video',
            duration: '18 min',
            content: 'Learn about var, let, const and different data types in JavaScript.',
            completed: true,
          },
          {
            id: 'lesson-1-2',
            title: 'Functions and Scope',
            type: 'code',
            duration: '25 min',
            content: 'Deep dive into functions, closures, and scope in JavaScript.',
            codeTemplate: '// Write a function that demonstrates closure\nfunction createCounter() {\n  // Your code here\n}\n\nconst counter = createCounter();\nconsole.log(counter());',
            language: 'javascript',
            completed: true,
          },
          {
            id: 'lesson-1-3',
            title: 'Arrays and Objects',
            type: 'reading',
            duration: '20 min',
            content: 'Understanding JavaScript arrays and objects, including manipulation methods.',
            completed: false,
          },
          {
            id: 'lesson-1-4',
            title: 'Control Flow and Loops',
            type: 'code',
            duration: '30 min',
            content: 'Master if/else, switch statements, and different types of loops.',
            codeTemplate: '// Implement a function using loops\nfunction findPrimes(n) {\n  // Your code here\n}',
            language: 'javascript',
            completed: false,
          },
        ],
      },
      {
        id: 'module-2',
        title: 'ES6+ Modern Features',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Arrow Functions and Template Literals',
            type: 'video',
            duration: '22 min',
            content: 'Learn modern ES6 syntax for cleaner, more concise code.',
            completed: false,
          },
          {
            id: 'lesson-2-2',
            title: 'Destructuring and Spread Operator',
            type: 'code',
            duration: '28 min',
            content: 'Master destructuring assignment and spread/rest operators.',
            codeTemplate: '// Practice destructuring\nconst user = { name: "John", age: 30, city: "NYC" };\n// Extract name and age using destructuring',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-2-3',
            title: 'Promises and Async/Await',
            type: 'code',
            duration: '35 min',
            content: 'Handle asynchronous operations with Promises and async/await.',
            codeTemplate: '// Create an async function\nasync function fetchData() {\n  // Your code here\n}',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-2-4',
            title: 'Module System (Import/Export)',
            type: 'reading',
            duration: '18 min',
            content: 'Understanding ES6 modules and how to structure your code.',
            completed: false,
          },
        ],
      },
      {
        id: 'module-3',
        title: 'Advanced Concepts',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Prototypes and Inheritance',
            type: 'video',
            duration: '32 min',
            content: 'Deep dive into JavaScript prototypal inheritance.',
            completed: false,
          },
          {
            id: 'lesson-3-2',
            title: 'Classes and OOP',
            type: 'code',
            duration: '40 min',
            content: 'Object-oriented programming with ES6 classes.',
            codeTemplate: '// Create a class with inheritance\nclass Animal {\n  // Your code here\n}',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-3-3',
            title: 'Error Handling',
            type: 'reading',
            duration: '15 min',
            content: 'Best practices for error handling with try/catch.',
            completed: false,
          },
          {
            id: 'lesson-3-4',
            title: 'Final Project Quiz',
            type: 'quiz',
            duration: '30 min',
            content: 'Test your knowledge of JavaScript fundamentals and advanced concepts.',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Python for Data Science',
    description: 'Complete Python course covering data analysis, visualization, and machine learning fundamentals.',
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=600&fit=crop',
    instructor: 'Prof. Michael Rodriguez',
    duration: '10 weeks',
    level: 'beginner',
    rating: 4.9,
    totalStudents: 23150,
    tags: ['Python', 'Data Science', 'Machine Learning'],
    modules: [
      {
        id: 'module-2-1',
        title: 'Python Basics',
        lessons: [
          {
            id: 'lesson-2-1-1',
            title: 'Python Setup and Basics',
            type: 'video',
            duration: '20 min',
            content: 'Install Python and learn basic syntax, variables, and data types.',
            completed: false,
          },
          {
            id: 'lesson-2-1-2',
            title: 'Lists, Tuples, and Dictionaries',
            type: 'code',
            duration: '30 min',
            content: 'Master Python data structures and their operations.',
            codeTemplate: '# Practice with Python data structures\nstudents = {"Alice": 85, "Bob": 92, "Charlie": 78}\n# Add your code here',
            language: 'python',
            completed: false,
          },
          {
            id: 'lesson-2-1-3',
            title: 'Control Flow and Functions',
            type: 'code',
            duration: '28 min',
            content: 'Learn if/else statements, loops, and how to create functions.',
            codeTemplate: '# Create a function to calculate factorial\ndef factorial(n):\n    # Your code here\n    pass',
            language: 'python',
            completed: false,
          },
        ],
      },
      {
        id: 'module-2-2',
        title: 'Data Analysis with Pandas',
        lessons: [
          {
            id: 'lesson-2-2-1',
            title: 'Introduction to NumPy',
            type: 'video',
            duration: '25 min',
            content: 'Learn array operations and numerical computing with NumPy.',
            completed: false,
          },
          {
            id: 'lesson-2-2-2',
            title: 'Pandas DataFrames',
            type: 'code',
            duration: '35 min',
            content: 'Work with DataFrames for data manipulation and analysis.',
            codeTemplate: 'import pandas as pd\n\n# Load and analyze data\ndf = pd.DataFrame({\n    "name": ["Alice", "Bob", "Charlie"],\n    "age": [25, 30, 35]\n})\n# Your analysis code here',
            language: 'python',
            completed: false,
          },
          {
            id: 'lesson-2-2-3',
            title: 'Data Cleaning and Preprocessing',
            type: 'reading',
            duration: '22 min',
            content: 'Handle missing data, duplicates, and data transformation.',
            completed: false,
          },
        ],
      },
      {
        id: 'module-2-3',
        title: 'Data Visualization',
        lessons: [
          {
            id: 'lesson-2-3-1',
            title: 'Matplotlib Basics',
            type: 'video',
            duration: '30 min',
            content: 'Create basic plots and charts with Matplotlib.',
            completed: false,
          },
          {
            id: 'lesson-2-3-2',
            title: 'Advanced Visualizations with Seaborn',
            type: 'code',
            duration: '35 min',
            content: 'Create statistical visualizations with Seaborn.',
            codeTemplate: 'import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Create visualizations\n# Your code here',
            language: 'python',
            completed: false,
          },
          {
            id: 'lesson-2-3-3',
            title: 'Data Visualization Quiz',
            type: 'quiz',
            duration: '20 min',
            content: 'Test your understanding of data visualization concepts.',
            completed: false,
          },
        ],
      },
      {
        id: 'module-2-4',
        title: 'Machine Learning Fundamentals',
        lessons: [
          {
            id: 'lesson-2-4-1',
            title: 'Introduction to Machine Learning',
            type: 'video',
            duration: '28 min',
            content: 'Understand ML concepts, types, and applications.',
            completed: false,
          },
          {
            id: 'lesson-2-4-2',
            title: 'Linear Regression with Scikit-learn',
            type: 'code',
            duration: '40 min',
            content: 'Build your first machine learning model.',
            codeTemplate: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Create and train a model\n# Your code here',
            language: 'python',
            completed: false,
          },
          {
            id: 'lesson-2-4-3',
            title: 'Model Evaluation',
            type: 'reading',
            duration: '25 min',
            content: 'Learn metrics and techniques to evaluate ML models.',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Full Stack Web Development',
    description: 'Build modern web applications with React, Node.js, Express, and MongoDB.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    instructor: 'Sarah Johnson',
    duration: '16 weeks',
    level: 'advanced',
    rating: 4.7,
    totalStudents: 18750,
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
    modules: [
      {
        id: 'module-3-1',
        title: 'Frontend with React',
        lessons: [
          {
            id: 'lesson-3-1-1',
            title: 'React Fundamentals',
            type: 'video',
            duration: '35 min',
            content: 'Learn components, props, and state in React.',
            completed: false,
          },
          {
            id: 'lesson-3-1-2',
            title: 'React Hooks',
            type: 'code',
            duration: '40 min',
            content: 'Master useState, useEffect, and custom hooks.',
            codeTemplate: 'import { useState, useEffect } from "react";\n\nfunction MyComponent() {\n  // Your code here\n}',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-3-1-3',
            title: 'State Management with Context',
            type: 'reading',
            duration: '25 min',
            content: 'Manage global state with React Context API.',
            completed: false,
          },
          {
            id: 'lesson-3-1-4',
            title: 'React Router and Navigation',
            type: 'code',
            duration: '30 min',
            content: 'Build multi-page applications with React Router.',
            codeTemplate: 'import { BrowserRouter, Routes, Route } from "react-router-dom";\n\n// Setup routing\n// Your code here',
            language: 'javascript',
            completed: false,
          },
        ],
      },
      {
        id: 'module-3-2',
        title: 'Backend with Node.js and Express',
        lessons: [
          {
            id: 'lesson-3-2-1',
            title: 'Node.js Basics',
            type: 'video',
            duration: '32 min',
            content: 'Understand Node.js runtime and async programming.',
            completed: false,
          },
          {
            id: 'lesson-3-2-2',
            title: 'Building REST APIs with Express',
            type: 'code',
            duration: '45 min',
            content: 'Create RESTful APIs with Express.js.',
            codeTemplate: 'const express = require("express");\nconst app = express();\n\n// Create your API routes\n// Your code here',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-3-2-3',
            title: 'Middleware and Error Handling',
            type: 'reading',
            duration: '28 min',
            content: 'Learn Express middleware and error handling patterns.',
            completed: false,
          },
          {
            id: 'lesson-3-2-4',
            title: 'Authentication with JWT',
            type: 'code',
            duration: '38 min',
            content: 'Implement secure authentication with JSON Web Tokens.',
            codeTemplate: 'const jwt = require("jsonwebtoken");\n\n// Create authentication middleware\n// Your code here',
            language: 'javascript',
            completed: false,
          },
        ],
      },
      {
        id: 'module-3-3',
        title: 'Database with MongoDB',
        lessons: [
          {
            id: 'lesson-3-3-1',
            title: 'MongoDB Basics',
            type: 'video',
            duration: '30 min',
            content: 'Introduction to NoSQL and MongoDB concepts.',
            completed: false,
          },
          {
            id: 'lesson-3-3-2',
            title: 'Mongoose ODM',
            type: 'code',
            duration: '35 min',
            content: 'Work with MongoDB using Mongoose schemas and models.',
            codeTemplate: 'const mongoose = require("mongoose");\n\n// Define your schema\nconst userSchema = new mongoose.Schema({\n  // Your schema here\n});',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-3-3-3',
            title: 'CRUD Operations',
            type: 'code',
            duration: '32 min',
            content: 'Implement Create, Read, Update, Delete operations.',
            codeTemplate: '// Implement CRUD operations\n// Your code here',
            language: 'javascript',
            completed: false,
          },
        ],
      },
      {
        id: 'module-3-4',
        title: 'Full Stack Integration',
        lessons: [
          {
            id: 'lesson-3-4-1',
            title: 'Connecting Frontend to Backend',
            type: 'video',
            duration: '40 min',
            content: 'Integrate React with Express API using fetch/axios.',
            completed: false,
          },
          {
            id: 'lesson-3-4-2',
            title: 'Deployment Strategies',
            type: 'reading',
            duration: '30 min',
            content: 'Deploy full stack applications to production.',
            completed: false,
          },
          {
            id: 'lesson-3-4-3',
            title: 'Final Project',
            type: 'code',
            duration: '60 min',
            content: 'Build a complete full stack application.',
            codeTemplate: '// Create your full stack project\n// Plan your architecture and implement',
            language: 'javascript',
            completed: false,
          },
          {
            id: 'lesson-3-4-4',
            title: 'Final Assessment',
            type: 'quiz',
            duration: '45 min',
            content: 'Test your full stack development knowledge.',
            completed: false,
          },
        ],
      },
    ],
  },
];

export const mockProgress: CourseProgress[] = [
  {
    courseId: 'course-1',
    userId: 'user-1',
    completedLessons: ['lesson-1-1', 'lesson-1-2'],
    currentLesson: 'lesson-1-3',
    progress: 40,
    lastAccessedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMentors: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Dr. Alex Thompson',
    email: 'alex@synthaxsphere.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Full-stack developer with 10+ years of experience.',
    expertise: ['JavaScript', 'React', 'Node.js'],
    rating: 4.9,
    totalSessions: 234,
    availability: ['Monday 6-8 PM', 'Wednesday 6-8 PM'],
  },
  {
    id: 'mentor-2',
    name: 'Maria Garcia',
    email: 'maria@synthaxsphere.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    bio: 'Data scientist and ML engineer.',
    expertise: ['Python', 'Machine Learning', 'Data Science'],
    rating: 4.8,
    totalSessions: 187,
    availability: ['Tuesday 7-9 PM', 'Thursday 7-9 PM'],
  },
];

export const mockMentorshipRequests: MentorshipRequest[] = [];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    authorId: 'user-4',
    authorName: 'DevMaster99',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
    title: 'How to optimize React performance?',
    content: 'I have a large React app with performance issues. What are best practices?',
    tags: ['React', 'Performance'],
    upvotes: 42,
    downvotes: 3,
    replies: [],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

// Blog articles are imported at the top and re-exported
export { mockBlogArticles };

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'course',
    title: 'New lesson available',
    message: 'A new lesson was added to Modern JavaScript Mastery',
    read: false,
    link: '/courses/course-1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export function initializeMockData() {
  const existingUser = localStorage.getItem('synthax_user');
  
  if (!existingUser) {
    localStorage.setItem('synthax_user', JSON.stringify(mockUser));
    localStorage.setItem('synthax_courses', JSON.stringify(mockCourses));
    localStorage.setItem('synthax_progress', JSON.stringify(mockProgress));
    localStorage.setItem('synthax_mentors', JSON.stringify(mockMentors));
    localStorage.setItem('synthax_requests', JSON.stringify(mockMentorshipRequests));
    localStorage.setItem('synthax_forum_posts', JSON.stringify(mockForumPosts));
    localStorage.setItem('synthax_blog_articles', JSON.stringify(mockBlogArticles));
    localStorage.setItem('synthax_notifications', JSON.stringify(mockNotifications));
    
    console.log('✅ Mock data initialized in localStorage');
  }
}
