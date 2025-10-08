// LocalStorage utility functions for Synthax Sphere

const STORAGE_KEYS = {
  USER: 'synthax_user',
  COURSES: 'synthax_courses',
  PROGRESS: 'synthax_progress',
  MENTORS: 'synthax_mentors',
  REQUESTS: 'synthax_requests',
  FORUM_POSTS: 'synthax_forum_posts',
  BLOG_ARTICLES: 'synthax_blog_articles',
  NOTIFICATIONS: 'synthax_notifications',
  CODE_PLAYGROUND: 'synthax_code_playground',
} as const;

// Generic storage functions
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
}

export function setInStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// Specific storage functions
export const storage = {
  // User
  getUser: () => getFromStorage<any>(STORAGE_KEYS.USER),
  setUser: (user: any) => setInStorage(STORAGE_KEYS.USER, user),
  removeUser: () => removeFromStorage(STORAGE_KEYS.USER),

  // Courses
  getCourses: () => getFromStorage<any>(STORAGE_KEYS.COURSES),
  setCourses: (courses: any) => setInStorage(STORAGE_KEYS.COURSES, courses),

  // Progress
  getProgress: () => getFromStorage<any>(STORAGE_KEYS.PROGRESS),
  setProgress: (progress: any) => setInStorage(STORAGE_KEYS.PROGRESS, progress),

  // Mentors
  getMentors: () => getFromStorage<any>(STORAGE_KEYS.MENTORS),
  setMentors: (mentors: any) => setInStorage(STORAGE_KEYS.MENTORS, mentors),

  // Mentorship Requests
  getRequests: () => getFromStorage<any>(STORAGE_KEYS.REQUESTS),
  setRequests: (requests: any) => setInStorage(STORAGE_KEYS.REQUESTS, requests),

  // Forum Posts
  getForumPosts: () => getFromStorage<any>(STORAGE_KEYS.FORUM_POSTS),
  setForumPosts: (posts: any) => setInStorage(STORAGE_KEYS.FORUM_POSTS, posts),

  // Blog Articles
  getBlogArticles: () => getFromStorage<any>(STORAGE_KEYS.BLOG_ARTICLES),
  setBlogArticles: (articles: any) => setInStorage(STORAGE_KEYS.BLOG_ARTICLES, articles),

  // Notifications
  getNotifications: () => getFromStorage<any>(STORAGE_KEYS.NOTIFICATIONS),
  setNotifications: (notifications: any) => setInStorage(STORAGE_KEYS.NOTIFICATIONS, notifications),

  // Code Playground
  getCodePlayground: (lessonId: string) => {
    const data = getFromStorage<Record<string, any>>(STORAGE_KEYS.CODE_PLAYGROUND);
    return data?.[lessonId] || null;
  },
  setCodePlayground: (lessonId: string, code: any) => {
    const data = getFromStorage<Record<string, any>>(STORAGE_KEYS.CODE_PLAYGROUND) || {};
    data[lessonId] = code;
    setInStorage(STORAGE_KEYS.CODE_PLAYGROUND, data);
  },
};

export default storage;
