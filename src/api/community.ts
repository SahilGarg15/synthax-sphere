// Mock Community & Forum API Functions

import { storage } from '@/utils/localStorage';
import { mockForumPosts, mockBlogArticles } from '@/data/mockData';
import type { ForumPost, BlogArticle, Reply, Comment } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all forum posts
 * Backend integration point: GET /api/forum/posts
 */
export async function getForumPosts(): Promise<ForumPost[]> {
  await delay(500);
  
  return storage.getForumPosts() || mockForumPosts;
}

/**
 * Get forum post by ID
 * Backend integration point: GET /api/forum/posts/:id
 */
export async function getForumPostById(postId: string): Promise<ForumPost | null> {
  await delay(400);
  
  const posts = storage.getForumPosts() || mockForumPosts;
  return posts.find((p: ForumPost) => p.id === postId) || null;
}

/**
 * Create a forum post
 * Backend integration point: POST /api/forum/posts
 */
export async function createForumPost(
  title: string,
  content: string,
  tags: string[]
): Promise<{ success: boolean; post?: ForumPost; message?: string }> {
  await delay(700);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'You must be logged in to create a post',
    };
  }
  
  const newPost: ForumPost = {
    id: `post-${Date.now()}`,
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar || '',
    title,
    content,
    tags,
    upvotes: 0,
    downvotes: 0,
    replies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const posts = storage.getForumPosts() || mockForumPosts;
  posts.unshift(newPost); // Add to beginning
  storage.setForumPosts(posts);
  
  return {
    success: true,
    post: newPost,
    message: 'Post created successfully',
  };
}

/**
 * Add reply to forum post
 * Backend integration point: POST /api/forum/posts/:id/replies
 */
export async function addReplyToPost(
  postId: string,
  content: string
): Promise<{ success: boolean; reply?: Reply; message?: string }> {
  await delay(500);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'You must be logged in to reply',
    };
  }
  
  const posts = storage.getForumPosts() || mockForumPosts;
  const post = posts.find((p: ForumPost) => p.id === postId);
  
  if (!post) {
    return {
      success: false,
      message: 'Post not found',
    };
  }
  
  const newReply: Reply = {
    id: `reply-${Date.now()}`,
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar || '',
    content,
    upvotes: 0,
    createdAt: new Date().toISOString(),
  };
  
  post.replies.push(newReply);
  post.updatedAt = new Date().toISOString();
  storage.setForumPosts(posts);
  
  return {
    success: true,
    reply: newReply,
    message: 'Reply added successfully',
  };
}

/**
 * Vote on forum post
 * Backend integration point: POST /api/forum/posts/:id/vote
 */
export async function voteOnPost(
  postId: string,
  voteType: 'up' | 'down'
): Promise<{ success: boolean; message?: string }> {
  await delay(300);
  
  const posts = storage.getForumPosts() || mockForumPosts;
  const post = posts.find((p: ForumPost) => p.id === postId);
  
  if (!post) {
    return {
      success: false,
      message: 'Post not found',
    };
  }
  
  if (voteType === 'up') {
    post.upvotes++;
  } else {
    post.downvotes++;
  }
  
  storage.setForumPosts(posts);
  
  return {
    success: true,
    message: 'Vote recorded',
  };
}

/**
 * Search forum posts
 * Backend integration point: GET /api/forum/posts/search?q=query
 */
export async function searchForumPosts(query: string): Promise<ForumPost[]> {
  await delay(400);
  
  const posts = storage.getForumPosts() || mockForumPosts;
  
  if (!query) return posts;
  
  const lowerQuery = query.toLowerCase();
  return posts.filter((post: ForumPost) =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get all blog articles
 * Backend integration point: GET /api/blog/articles
 */
export async function getBlogArticles(): Promise<BlogArticle[]> {
  await delay(500);
  
  return storage.getBlogArticles() || mockBlogArticles;
}

/**
 * Get blog article by ID
 * Backend integration point: GET /api/blog/articles/:id
 */
export async function getBlogArticleById(articleId: string): Promise<BlogArticle | null> {
  await delay(400);
  
  const articles = storage.getBlogArticles() || mockBlogArticles;
  return articles.find((a: BlogArticle) => a.id === articleId) || null;
}

/**
 * React to blog article
 * Backend integration point: POST /api/blog/articles/:id/react
 */
export async function reactToBlogArticle(
  articleId: string,
  reaction: string
): Promise<{ success: boolean; message?: string }> {
  await delay(300);
  
  const articles = storage.getBlogArticles() || mockBlogArticles;
  const article = articles.find((a: BlogArticle) => a.id === articleId);
  
  if (!article) {
    return {
      success: false,
      message: 'Article not found',
    };
  }
  
  if (!article.reactions[reaction]) {
    article.reactions[reaction] = 0;
  }
  article.reactions[reaction]++;
  
  storage.setBlogArticles(articles);
  
  return {
    success: true,
    message: 'Reaction added',
  };
}

/**
 * Add comment to blog article
 * Backend integration point: POST /api/blog/articles/:id/comments
 */
export async function addCommentToBlogArticle(
  articleId: string,
  content: string
): Promise<{ success: boolean; comment?: Comment; message?: string }> {
  await delay(500);
  
  const currentUser = storage.getUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'You must be logged in to comment',
    };
  }
  
  const articles = storage.getBlogArticles() || mockBlogArticles;
  const article = articles.find((a: BlogArticle) => a.id === articleId);
  
  if (!article) {
    return {
      success: false,
      message: 'Article not found',
    };
  }
  
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar || '',
    content,
    createdAt: new Date().toISOString(),
  };
  
  article.comments.push(newComment);
  storage.setBlogArticles(articles);
  
  return {
    success: true,
    comment: newComment,
    message: 'Comment added successfully',
  };
}
