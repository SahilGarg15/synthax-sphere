// Mock Mentor & Mentorship API Functions

import { storage } from '@/utils/localStorage';
import { mockMentors, mockMentorshipRequests } from '@/data/mockData';
import type { Mentor, MentorshipRequest } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all mentors
 * Backend integration point: GET /api/mentors
 */
export async function getMentors(): Promise<Mentor[]> {
  await delay(500);
  
  return storage.getMentors() || mockMentors;
}

/**
 * Get mentor by ID
 * Backend integration point: GET /api/mentors/:id
 */
export async function getMentorById(mentorId: string): Promise<Mentor | null> {
  await delay(400);
  
  const mentors = storage.getMentors() || mockMentors;
  return mentors.find((m: Mentor) => m.id === mentorId) || null;
}

/**
 * Get mentorship requests for current mentor
 * Backend integration point: GET /api/mentors/me/requests
 */
export async function getMentorshipRequests(): Promise<MentorshipRequest[]> {
  await delay(400);
  
  const currentUser = storage.getUser();
  if (!currentUser) return [];
  
  const requests = storage.getRequests() || mockMentorshipRequests;
  return requests.filter((r: MentorshipRequest) => r.mentorId === currentUser.id);
}

/**
 * Create a mentorship request
 * Backend integration point: POST /api/mentorship/request
 */
export async function createMentorshipRequest(
  mentorId: string,
  topic: string,
  message: string
): Promise<{ success: boolean; request?: MentorshipRequest; message?: string }> {
  await delay(600);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'You must be logged in to request mentorship',
    };
  }
  
  const newRequest: MentorshipRequest = {
    id: `req-${Date.now()}`,
    menteeId: currentUser.id,
    menteeName: currentUser.name,
    mentorId,
    topic,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  const requests = storage.getRequests() || mockMentorshipRequests;
  requests.push(newRequest);
  storage.setRequests(requests);
  
  return {
    success: true,
    request: newRequest,
    message: 'Mentorship request sent successfully',
  };
}

/**
 * Update mentorship request status
 * Backend integration point: PUT /api/mentorship/request/:id
 */
export async function updateMentorshipRequest(
  requestId: string,
  status: 'accepted' | 'rejected' | 'completed',
  scheduledAt?: string
): Promise<{ success: boolean; message?: string }> {
  await delay(500);
  
  const requests = storage.getRequests() || mockMentorshipRequests;
  const request = requests.find((r: MentorshipRequest) => r.id === requestId);
  
  if (!request) {
    return {
      success: false,
      message: 'Request not found',
    };
  }
  
  request.status = status;
  if (scheduledAt) {
    request.scheduledAt = scheduledAt;
  }
  
  storage.setRequests(requests);
  
  return {
    success: true,
    message: `Request ${status} successfully`,
  };
}

/**
 * Search mentors by expertise
 * Backend integration point: GET /api/mentors/search?expertise=query
 */
export async function searchMentors(expertise: string): Promise<Mentor[]> {
  await delay(400);
  
  const mentors = storage.getMentors() || mockMentors;
  
  if (!expertise) return mentors;
  
  const lowerQuery = expertise.toLowerCase();
  return mentors.filter((mentor: Mentor) =>
    mentor.expertise.some(exp => exp.toLowerCase().includes(lowerQuery))
  );
}
