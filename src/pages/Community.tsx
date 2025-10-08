import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Tag,
  X,
  Send,
  Heart,
  Bookmark,
  Share2,
  TrendingUp,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { mockForumPosts, mockBlogArticles } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import type { ForumPost, BlogArticle } from '@/types';

const POSTS_PER_PAGE = 5;
const ARTICLES_PER_PAGE = 6;

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyText, setReplyText] = useState('');
  const [forumPage, setForumPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [upvotedPosts, setUpvotedPosts] = useState<Set<string>>(new Set());
  const [downvotedPosts, setDownvotedPosts] = useState<Set<string>>(new Set());
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [voteAdjustments, setVoteAdjustments] = useState<{ [postId: string]: number }>({});

  const allTags = Array.from(new Set(mockForumPosts.flatMap((post) => post.tags)));

  // Filter and sort posts
  let filteredPosts = mockForumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (sortBy === 'popular') {
    filteredPosts = [...filteredPosts].sort((a, b) => b.upvotes - a.upvotes);
  } else {
    filteredPosts = [...filteredPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Pagination
  const totalForumPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (forumPage - 1) * POSTS_PER_PAGE,
    forumPage * POSTS_PER_PAGE
  );

  const totalBlogPages = Math.ceil(mockBlogArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = mockBlogArticles.slice(
    (blogPage - 1) * ARTICLES_PER_PAGE,
    blogPage * ARTICLES_PER_PAGE
  );

  // Handlers
  const handleUpvote = (postId: string) => {
    setVoteAdjustments((prev) => {
      const current = prev[postId] || 0;
      const newValue = current + 1;
      toast.success('Post upvoted!');
      return { ...prev, [postId]: newValue };
    });
    
    // Mark as upvoted for styling
    setUpvotedPosts((prev) => new Set(prev).add(postId));
    setDownvotedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  const handleDownvote = (postId: string) => {
    setVoteAdjustments((prev) => {
      const current = prev[postId] || 0;
      const newValue = current - 1;
      toast.info('Post downvoted');
      return { ...prev, [postId]: newValue };
    });
    
    // Mark as downvoted for styling
    setDownvotedPosts((prev) => new Set(prev).add(postId));
    setUpvotedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    toast.success('Reply posted!');
    setReplyText('');
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill in title and content');
      return;
    }
    toast.success('Post created successfully!');
    setShowCreatePost(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags([]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newPostTags.includes(tagInput.trim())) {
      setNewPostTags([...newPostTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewPostTags(newPostTags.filter((t) => t !== tag));
  };

  const handleLikeArticle = (articleId: string) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
        toast.info('Like removed');
      } else {
        newSet.add(articleId);
        toast.success('Article liked!');
      }
      return newSet;
    });
  };

  const handleBookmarkArticle = (articleId: string) => {
    setBookmarkedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
        toast.info('Bookmark removed');
      } else {
        newSet.add(articleId);
        toast.success('Article bookmarked!');
      }
      return newSet;
    });
  };

  const getVoteCount = (post: ForumPost) => {
    const adjustment = voteAdjustments[post.id] || 0;
    return post.upvotes + adjustment;
  };

  const getLikeCount = (article: BlogArticle) => {
    let count = article.reactions.like;
    if (likedArticles.has(article.id)) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Community</span> Hub
              </h1>
              <p className="text-muted-foreground">Connect, share, and learn together</p>
            </div>
            <Button variant="hero" onClick={() => setShowCreatePost(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="forum">
              <MessageCircle className="mr-2 h-4 w-4" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="blog">
              <TrendingUp className="mr-2 h-4 w-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* FORUM TAB */}
          <TabsContent value="forum" className="space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex gap-4 flex-wrap">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={(val: 'recent' | 'popular') => setSortBy(val)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent
                      </div>
                    </SelectItem>
                    <SelectItem value="popular">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Popular
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tags:</span>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="card-glow-hover cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => setSelectedPost(post)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {/* Vote Column */}
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${upvotedPosts.has(post.id) ? 'text-primary' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpvote(post.id);
                            }}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-bold text-primary">{getVoteCount(post)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${downvotedPosts.has(post.id) ? 'text-destructive' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownvote(post.id);
                            }}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                              <span className="text-sm font-medium">{post.authorId}</span>
                            </div>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageCircle className="h-4 w-4" />
                              {post.replies.length} replies
                            </div>

                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </span>

                            <div className="flex items-center gap-2 ml-auto flex-wrap">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalForumPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setForumPage((p) => Math.max(1, p - 1))}
                  disabled={forumPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {forumPage} of {totalForumPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setForumPage((p) => Math.min(totalForumPages, p + 1))}
                  disabled={forumPage === totalForumPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {paginatedPosts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-muted-foreground">No posts found. Try adjusting your search.</p>
              </motion.div>
            )}
          </TabsContent>

          {/* BLOG TAB */}
          <TabsContent value="blog" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="card-glow-hover h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-primary to-accent rounded-t-lg relative overflow-hidden">
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleLikeArticle(article.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${likedArticles.has(article.id) ? 'fill-red-500 text-red-500' : ''}`}
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleBookmarkArticle(article.id)}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${bookmarkedArticles.has(article.id) ? 'fill-current' : ''}`}
                          />
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{article.content}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {getLikeCount(article)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {article.comments.length}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Blog Pagination */}
            {totalBlogPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBlogPage((p) => Math.max(1, p - 1))}
                  disabled={blogPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {blogPage} of {totalBlogPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBlogPage((p) => Math.min(totalBlogPages, p + 1))}
                  disabled={blogPage === totalBlogPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-background border border-border rounded-lg z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
                    <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <span className="font-medium">{selectedPost.authorId}</span>
                      </div>
                      <span>{formatDistanceToNow(new Date(selectedPost.createdAt), { addSuffix: true })}</span>
                      <div className="flex items-center gap-2">
                        {selectedPost.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground">{selectedPost.content}</p>
                </div>

                {/* Voting */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={upvotedPosts.has(selectedPost.id) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleUpvote(selectedPost.id)}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Upvote
                    </Button>
                    <span className="font-bold">{getVoteCount(selectedPost)}</span>
                    <Button
                      variant={downvotedPosts.has(selectedPost.id) ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleDownvote(selectedPost.id)}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Downvote
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Separator />

                {/* Replies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{selectedPost.replies.length} Replies</h3>
                  {selectedPost.replies.map((reply) => (
                    <Card key={reply.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{reply.authorId}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{reply.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Reply Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Add a Reply</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={handleReply} disabled={!replyText.trim()}>
                        <Send className="mr-2 h-4 w-4" />
                        Post Reply
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCreatePost(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-20 lg:inset-32 bg-background border border-border rounded-lg z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Create New Post</h2>
                    <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreatePost(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                {/* Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      placeholder="Enter a descriptive title..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Share your thoughts, questions, or insights..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      />
                      <Button onClick={handleAddTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    {newPostTags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {newPostTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-destructive/20"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag} <X className="ml-1 h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleCreatePost}
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Publish Post
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
