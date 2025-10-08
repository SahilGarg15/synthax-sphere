// Mock Courses API Functions

import { storage } from '@/utils/localStorage';
import { mockCourses, mockProgress } from '@/data/mockData';
import type { Course, CourseProgress, Lesson } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all courses
 * Backend integration point: GET /api/courses
 */
export async function getCourses(): Promise<Course[]> {
  await delay(600);

  const courses = storage.getCourses() || mockCourses;
  
  // Merge with progress data
  const progress = storage.getProgress() || mockProgress;
  const currentUser = storage.getUser();

  if (!currentUser) return courses;

  return courses.map(course => {
    const courseProgress = progress.find(
      p => p.courseId === course.id && p.userId === currentUser.id
    );
    
    return {
      ...course,
      progress: courseProgress?.progress || 0,
    };
  });
}

/**
 * Get course by ID
 * Backend integration point: GET /api/courses/:id
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  await delay(400);

  const courses = storage.getCourses() || mockCourses;
  const course = courses.find(c => c.id === courseId);

  if (!course) return null;

  // Merge with progress
  const progress = storage.getProgress() || mockProgress;
  const currentUser = storage.getUser();

  if (!currentUser) return course;

  const courseProgress = progress.find(
    p => p.courseId === courseId && p.userId === currentUser.id
  );

  // Mark lessons as completed
  if (courseProgress) {
    const updatedModules = course.modules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        completed: courseProgress.completedLessons.includes(lesson.id),
      })),
    }));

    return {
      ...course,
      modules: updatedModules,
      progress: courseProgress.progress,
    };
  }

  return course;
}

/**
 * Mark lesson as complete
 * Backend integration point: POST /api/courses/:courseId/lessons/:lessonId/complete
 */
export async function markLessonComplete(
  courseId: string,
  lessonId: string
): Promise<{ success: boolean; progress: number }> {
  await delay(400);

  const currentUser = storage.getUser();
  if (!currentUser) {
    return { success: false, progress: 0 };
  }

  const progress = storage.getProgress() || mockProgress;
  let courseProgress = progress.find(
    p => p.courseId === courseId && p.userId === currentUser.id
  );

  // Get total lessons count
  const courses = storage.getCourses() || mockCourses;
  const course = courses.find(c => c.id === courseId);
  if (!course) return { success: false, progress: 0 };

  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  if (!courseProgress) {
    // Create new progress entry
    courseProgress = {
      courseId,
      userId: currentUser.id,
      completedLessons: [lessonId],
      currentLesson: lessonId,
      progress: Math.round((1 / totalLessons) * 100),
      lastAccessedAt: new Date().toISOString(),
    };
    progress.push(courseProgress);
  } else {
    // Update existing progress
    if (!courseProgress.completedLessons.includes(lessonId)) {
      courseProgress.completedLessons.push(lessonId);
      courseProgress.progress = Math.round(
        (courseProgress.completedLessons.length / totalLessons) * 100
      );
    }
    courseProgress.lastAccessedAt = new Date().toISOString();
  }

  storage.setProgress(progress);

  return {
    success: true,
    progress: courseProgress.progress,
  };
}

/**
 * Get user's course progress
 * Backend integration point: GET /api/users/me/progress
 */
export async function getUserProgress(): Promise<CourseProgress[]> {
  await delay(300);

  const currentUser = storage.getUser();
  if (!currentUser) return [];

  const progress = storage.getProgress() || mockProgress;
  return progress.filter(p => p.userId === currentUser.id);
}

/**
 * Get next recommended lesson
 * Backend integration point: GET /api/courses/:courseId/next-lesson
 */
export async function getNextLesson(courseId: string): Promise<Lesson | null> {
  await delay(300);

  const course = await getCourseById(courseId);
  if (!course) return null;

  // Find first incomplete lesson
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (!lesson.completed) {
        return lesson;
      }
    }
  }

  return null; // All lessons completed
}

/**
 * Search courses by query
 * Backend integration point: GET /api/courses/search?q=query
 */
export async function searchCourses(query: string): Promise<Course[]> {
  await delay(500);

  const courses = await getCourses();
  
  if (!query) return courses;

  const lowerQuery = query.toLowerCase();
  return courses.filter(
    course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
