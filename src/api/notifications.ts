// Mock Notifications API Functions

import { storage } from '@/utils/localStorage';
import { mockNotifications } from '@/data/mockData';
import type { Notification } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all notifications for current user
 * Backend integration point: GET /api/notifications
 */
export async function getNotifications(): Promise<Notification[]> {
  await delay(400);
  
  const currentUser = storage.getUser();
  if (!currentUser) return [];
  
  const notifications = storage.getNotifications() || mockNotifications;
  return notifications
    .filter((n: Notification) => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get unread notification count
 * Backend integration point: GET /api/notifications/unread-count
 */
export async function getUnreadCount(): Promise<number> {
  const notifications = await getNotifications();
  return notifications.filter(n => !n.read).length;
}

/**
 * Mark notification as read
 * Backend integration point: PUT /api/notifications/:id/read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<{ success: boolean; message?: string }> {
  await delay(300);
  
  const notifications = storage.getNotifications() || mockNotifications;
  const notification = notifications.find((n: Notification) => n.id === notificationId);
  
  if (!notification) {
    return {
      success: false,
      message: 'Notification not found',
    };
  }
  
  notification.read = true;
  storage.setNotifications(notifications);
  
  return {
    success: true,
    message: 'Notification marked as read',
  };
}

/**
 * Mark all notifications as read
 * Backend integration point: PUT /api/notifications/read-all
 */
export async function markAllNotificationsAsRead(): Promise<{ success: boolean; message?: string }> {
  await delay(400);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'User not found',
    };
  }
  
  const notifications = storage.getNotifications() || mockNotifications;
  notifications.forEach((n: Notification) => {
    if (n.userId === currentUser.id) {
      n.read = true;
    }
  });
  
  storage.setNotifications(notifications);
  
  return {
    success: true,
    message: 'All notifications marked as read',
  };
}

/**
 * Delete notification
 * Backend integration point: DELETE /api/notifications/:id
 */
export async function deleteNotification(
  notificationId: string
): Promise<{ success: boolean; message?: string }> {
  await delay(300);
  
  const notifications = storage.getNotifications() || mockNotifications;
  const index = notifications.findIndex((n: Notification) => n.id === notificationId);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Notification not found',
    };
  }
  
  notifications.splice(index, 1);
  storage.setNotifications(notifications);
  
  return {
    success: true,
    message: 'Notification deleted',
  };
}

/**
 * Create a new notification (used internally for simulating real-time updates)
 * Backend integration point: POST /api/notifications
 */
export async function createNotification(
  type: 'course' | 'mentor' | 'forum' | 'system',
  title: string,
  message: string,
  link?: string
): Promise<{ success: boolean; notification?: Notification }> {
  await delay(200);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
    };
  }
  
  const newNotification: Notification = {
    id: `notif-${Date.now()}`,
    userId: currentUser.id,
    type,
    title,
    message,
    read: false,
    link,
    createdAt: new Date().toISOString(),
  };
  
  const notifications = storage.getNotifications() || mockNotifications;
  notifications.unshift(newNotification); // Add to beginning
  storage.setNotifications(notifications);
  
  return {
    success: true,
    notification: newNotification,
  };
}
