# 🎓 CodeTeach - Modern Learning Management System

<div align="center">

![CodeTeach Banner](https://img.shields.io/badge/CodeTeach-LMS-6366f1?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**A comprehensive Learning Management System with interactive courses, code playground, mentorship, and community features.**

[Features](#-features) • [Demo](#-demo-accounts) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

CodeTeach is a full-featured Learning Management System designed for coding education. It provides an interactive learning environment with live code execution, mentor-student connections, community discussions, and role-based dashboards for learners, mentors, and administrators.

### ✨ Key Highlights

- 🎯 **Interactive Learning** - Monaco editor-powered code playground with multi-language support
- 👥 **Mentorship Platform** - Connect with expert mentors, book 1-on-1 sessions
- 💬 **Community Forum** - Engage in discussions, upvote posts, share knowledge
- 📊 **Role-Based Dashboards** - Customized interfaces for learners, mentors, and admins
- 🌗 **Dark Mode** - Seamless theme switching with persistent preferences
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

---

## 🚀 Features

### 🎓 **Course Management**
- Browse comprehensive course catalog
- Filter by category, level, and search
- Track learning progress with completion metrics
- Video lessons with curriculum structure
- Downloadable resources and materials
- Certificate generation upon completion
- Personal notes for each lesson

### 💻 **Code Playground**
- **Monaco Editor** integration (VS Code editor)
- Multi-language support: JavaScript, Python, HTML, Java, C++
- Syntax highlighting and auto-completion
- Multiple file tabs management
- Theme support (light/dark)
- Save code to localStorage
- Copy/reset functionality
- ⚠️ *Code execution requires backend integration*

### 👨‍🏫 **Mentorship System**
- Browse mentor profiles with ratings and expertise
- Filter by skills, experience, and hourly rate
- Book 1-on-1 mentorship sessions
- Real-time availability status
- Direct messaging with mentors
- Session history tracking
- Review and rating system

### 💬 **Community & Forum**
- Create and share posts with the community
- Upvote/downvote system for content curation
- Tag-based filtering and categorization
- Comment and reply threads
- Blog articles section
- Like and bookmark functionality
- Pagination and sorting options
- Rich text formatting

### 📊 **Dashboards**

#### **Learner Dashboard**
- Enrolled courses overview
- Progress statistics and streaks
- Upcoming mentorship sessions
- Achievement badges
- Recent activity feed
- Quick action shortcuts

#### **Mentor Dashboard**
- Session management
- Student statistics
- Earnings overview and charts
- Reviews and ratings display
- Schedule management
- Performance metrics

#### **Admin Dashboard**
- Platform-wide statistics
- User management (learners, mentors)
- Course management
- Revenue and analytics charts
- System health monitoring
- Activity logs

### 🔔 **Notification System**
- Real-time notifications (simulated)
- Multiple notification types (course, community, badges, mentorship)
- Mark as read/unread
- Bulk actions (mark all as read, delete)
- Filter by type
- Persistent storage
- Unread count badge

### 🔐 **Authentication & Authorization**
- Role-based access control (Learner, Mentor, Admin)
- Protected routes
- Session persistence with localStorage
- Auto-redirect based on authentication
- Test accounts for each role

### 🎨 **UI/UX Features**
- Beautiful gradient effects and animations
- Card glow effects and glassmorphism
- Smooth page transitions (Framer Motion)
- Toast notifications for user feedback
- Loading states and skeleton loaders
- Accessible components (ARIA labels)
- Form validation
- Modal dialogs with proper positioning

---

## 🎮 Demo Accounts

Use these credentials to explore different user roles:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Learner** | `learner@test.com` | `password123` | Course enrollment, progress tracking |
| **Mentor** | `mentor@test.com` | `password123` | Session management, earnings |
| **Admin** | `admin@test.com` | `password123` | Full platform management |

📄 See [TEST_ACCOUNTS.md](./TEST_ACCOUNTS.md) for detailed role capabilities.

---

## 💻 Installation

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/SahilGarg15/CodeTeach.git

# 2. Navigate to project directory
cd CodeTeach

# 3. Install dependencies
npm install
# or
yarn install

# 4. Start development server
npm run dev
# or
yarn dev

# 5. Open your browser
# Visit http://localhost:8080
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

### **Core Technologies**
- **React 18** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Vite 5** - Fast build tool and dev server

### **UI & Styling**
- **TailwindCSS 3** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library (50+ components)
- **Framer Motion** - Animation library
- **Lucide Icons** - Beautiful icon set

### **Code Editor**
- **Monaco Editor** - VS Code's editor component
- **@monaco-editor/react** - React integration

### **State Management**
- **Zustand** - Lightweight state management
  - `authStore` - Authentication state
  - `themeStore` - Theme preferences

### **Utilities**
- **React Router v6** - Client-side routing
- **date-fns** - Date formatting and manipulation
- **Sonner** - Toast notifications
- **@tanstack/react-query** - Data fetching and caching

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript linting

---

## 📁 Project Structure

```
CodeTeach/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── api/               # API utility functions
│   │   ├── auth.ts
│   │   ├── courses.ts
│   │   ├── community.ts
│   │   ├── mentors.ts
│   │   └── notifications.ts
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components (50+)
│   │   ├── CodePlayground.tsx
│   │   ├── Hero3D.tsx
│   │   ├── Navbar.tsx
│   │   └── NotificationCenter.tsx
│   ├── data/             # Mock data
│   │   ├── mockData.ts
│   │   └── blogArticlesData.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/              # Utility libraries
│   │   └── utils.ts
│   ├── pages/            # Page components
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseViewer.tsx
│   │   ├── Playground.tsx
│   │   ├── Community.tsx
│   │   ├── Mentorship.tsx
│   │   ├── LearnerDashboard.tsx
│   │   ├── MentorDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   ├── stores/           # Zustand stores
│   │   ├── authStore.ts
│   │   └── themeStore.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── localStorage.ts
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── FRONTEND_COMPLETION_STATUS.md
├── FEATURES_COMPLETED.md
├── TEST_ACCOUNTS.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 📚 Documentation

### Additional Resources

- 📋 [Feature Completion Status](./FRONTEND_COMPLETION_STATUS.md) - Comprehensive feature checklist
- ✅ [Features Completed](./FEATURES_COMPLETED.md) - Implemented features list
- 👤 [Test Accounts Guide](./TEST_ACCOUNTS.md) - Detailed role information

### Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Homepage with hero, features, CTA |
| **Login** | `/login` | User authentication |
| **Signup** | `/signup` | User registration |
| **Courses** | `/courses` | Course catalog |
| **Course Viewer** | `/courses/:id` | Individual course content |
| **Playground** | `/playground` | Code editor and execution |
| **Community** | `/community` | Forum and blog |
| **Mentorship** | `/mentorship` | Mentor marketplace |
| **Learner Dashboard** | `/dashboard/learner` | Student overview |
| **Mentor Dashboard** | `/dashboard/mentor` | Mentor management |
| **Admin Dashboard** | `/dashboard/admin` | Platform administration |

---

## ⚠️ Backend Integration Required

The frontend is **100% complete** but requires backend API integration for:

### 🔌 **API Endpoints Needed**

1. **Authentication**
   - `POST /api/auth/register` - User registration
   - `POST /api/auth/login` - User login
   - `POST /api/auth/logout` - User logout
   - `GET /api/auth/me` - Get current user
   - `POST /api/auth/refresh` - Refresh JWT token

2. **Courses**
   - `GET /api/courses` - List all courses
   - `GET /api/courses/:id` - Get course details
   - `POST /api/courses/:id/enroll` - Enroll in course
   - `PUT /api/courses/:id/progress` - Update progress
   - `POST /api/courses/:id/notes` - Save notes

3. **Code Execution**
   - `POST /api/code/execute` - Run code (JavaScript, Python, etc.)
   - Suggested: [Judge0 API](https://judge0.com/) or [Piston](https://github.com/engineer-man/piston)

4. **Mentorship**
   - `GET /api/mentors` - List mentors
   - `GET /api/mentors/:id` - Get mentor profile
   - `POST /api/sessions/book` - Book session
   - `POST /api/messages/send` - Send message

5. **Community**
   - `GET /api/posts` - List forum posts
   - `POST /api/posts` - Create post
   - `POST /api/posts/:id/vote` - Upvote/downvote
   - `POST /api/posts/:id/comments` - Add comment

6. **Notifications**
   - `GET /api/notifications` - Get user notifications
   - `PUT /api/notifications/:id/read` - Mark as read
   - WebSocket connection for real-time updates

### 🗄️ **Database Schema Needed**

- Users (learners, mentors, admins)
- Courses and lessons
- Enrollments and progress
- Forum posts and comments
- Mentorship sessions
- Notifications
- Reviews and ratings

---

## 🚀 Deployment

### Frontend Deployment Options

- **Vercel** - Recommended for React + Vite
- **Netlify** - Easy continuous deployment
- **AWS Amplify** - Scalable cloud hosting
- **GitHub Pages** - Free static hosting

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Create a `.env` file for API endpoints:

```env
VITE_API_URL=https://your-backend-api.com
VITE_SOCKET_URL=wss://your-websocket-url.com
VITE_JUDGE0_API_KEY=your-judge0-api-key
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Sahil Garg**
- GitHub: [@SahilGarg15](https://github.com/SahilGarg15)
- Repository: [CodeTeach](https://github.com/SahilGarg15/CodeTeach)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code's editor
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

---

## 📞 Support

If you have any questions or need help with setup:

1. Check the [documentation files](./FRONTEND_COMPLETION_STATUS.md)
2. Review [test accounts](./TEST_ACCOUNTS.md) for role-based access
3. Open an issue on [GitHub](https://github.com/SahilGarg15/CodeTeach/issues)

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ for developers by developers

</div>
