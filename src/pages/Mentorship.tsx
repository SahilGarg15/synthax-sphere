import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Calendar, MessageCircle, Video, Award, Clock, Users, Filter, ChevronRight, X, Send, Mail, Phone, Globe, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

interface Mentor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  hourlyRate: number;
  avatar: string;
  bio: string;
  availability: string;
  languages: string[];
  responseTime: string;
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    title: 'Senior Full Stack Developer',
    expertise: ['React', 'Node.js', 'TypeScript', 'System Design'],
    rating: 4.9,
    reviews: 127,
    sessionsCompleted: 342,
    hourlyRate: 80,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    bio: '10+ years of experience in full-stack development. Specialized in modern web technologies and system architecture.',
    availability: 'Available Today',
    languages: ['English', 'Hindi'],
    responseTime: '< 2 hours',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'AI/ML Engineer',
    expertise: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    rating: 4.8,
    reviews: 95,
    sessionsCompleted: 256,
    hourlyRate: 90,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'AI researcher and practitioner. Helping students master machine learning and deep learning concepts.',
    availability: 'Available Tomorrow',
    languages: ['English', 'Mandarin'],
    responseTime: '< 3 hours',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'DevOps Architect',
    expertise: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    rating: 4.9,
    reviews: 143,
    sessionsCompleted: 398,
    hourlyRate: 85,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Cloud infrastructure expert with extensive experience in DevOps practices and automation.',
    availability: 'Available Today',
    languages: ['English', 'Spanish'],
    responseTime: '< 1 hour',
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    title: 'Mobile Development Expert',
    expertise: ['React Native', 'Flutter', 'iOS', 'Android'],
    rating: 4.7,
    reviews: 88,
    sessionsCompleted: 234,
    hourlyRate: 75,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    bio: 'Mobile app developer passionate about creating seamless cross-platform experiences.',
    availability: 'Available in 2 days',
    languages: ['English', 'Hindi', 'Tamil'],
    responseTime: '< 4 hours',
  },
  {
    id: '5',
    name: 'Emma Williams',
    title: 'UI/UX Designer & Frontend Dev',
    expertise: ['Figma', 'React', 'CSS', 'Design Systems'],
    rating: 5.0,
    reviews: 112,
    sessionsCompleted: 289,
    hourlyRate: 70,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    bio: 'Designer-developer hybrid specializing in creating beautiful and functional user interfaces.',
    availability: 'Available Today',
    languages: ['English', 'French'],
    responseTime: '< 2 hours',
  },
  {
    id: '6',
    name: 'David Park',
    title: 'Blockchain Developer',
    expertise: ['Solidity', 'Web3', 'Smart Contracts', 'Ethereum'],
    rating: 4.8,
    reviews: 76,
    sessionsCompleted: 198,
    hourlyRate: 95,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: 'Blockchain enthusiast helping developers enter the Web3 space with practical guidance.',
    availability: 'Available Tomorrow',
    languages: ['English', 'Korean'],
    responseTime: '< 3 hours',
  },
];

const upcomingSessions = [
  {
    id: '1',
    mentorName: 'Dr. Priya Sharma',
    mentorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    topic: 'React Hooks Deep Dive',
    date: 'Today',
    time: '3:00 PM - 4:00 PM',
    type: 'Video Call',
  },
  {
    id: '2',
    mentorName: 'Sarah Johnson',
    mentorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    topic: 'AWS Architecture Review',
    date: 'Tomorrow',
    time: '10:00 AM - 11:00 AM',
    type: 'Video Call',
  },
];

export default function Mentorship() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [chatMentor, setChatMentor] = useState<Mentor | null>(null);
  
  // Booking form state
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingTopic, setBookingTopic] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  
  // Chat state
  const [chatMessage, setChatMessage] = useState('');

  const filteredMentors = mockMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise =
      selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);

    return matchesSearch && matchesExpertise;
  });

  const handleBookSession = (mentor: Mentor) => {
    setBookingMentor(mentor);
    setShowBookingModal(true);
  };

  const handleSendMessage = (mentor: Mentor) => {
    setChatMentor(mentor);
    setShowChatModal(true);
  };

  const handleViewProfile = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowProfileModal(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingDate || !bookingTime || !bookingTopic) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success(`Session booked with ${bookingMentor?.name}!`);
    setShowBookingModal(false);
    setBookingDate('');
    setBookingTime('');
    setBookingTopic('');
    setBookingNotes('');
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    toast.success(`Message sent to ${chatMentor?.name}!`);
    setChatMessage('');
    setShowChatModal(false);
  };

  const handleJoinSession = (sessionId: string) => {
    toast.success('Joining session...');
    // Future: Open video call interface
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Find Your <span className="gradient-text">Perfect Mentor</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with industry experts for personalized 1-on-1 guidance and accelerate your learning journey
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Users, label: 'Expert Mentors', value: '500+', color: 'text-primary' },
            { icon: Video, label: 'Sessions Completed', value: '10K+', color: 'text-accent' },
            { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-primary' },
            { icon: Clock, label: 'Avg Response Time', value: '< 2h', color: 'text-accent' },
          ].map((stat, index) => (
            <Card key={index} className="card-glow-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          </TabsList>

          {/* Browse Mentors Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-glow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, expertise, or technology..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Expertise</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Node.js">Node.js</SelectItem>
                        <SelectItem value="AWS">AWS</SelectItem>
                        <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mentors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="card-glow-hover h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription className="text-xs">{mentor.title}</CardDescription>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Video className="h-4 w-4" />
                          <span>{mentor.sessionsCompleted} sessions</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {mentor.expertise.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.expertise.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Availability:</span>
                          <span className="ml-2 font-medium text-primary">{mentor.availability}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold">${mentor.hourlyRate}</span>
                          <span className="text-muted-foreground text-sm">/hour</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Response: {mentor.responseTime}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          className="flex-1"
                          onClick={() => handleBookSession(mentor)}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Session
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleSendMessage(mentor)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full mt-2"
                        onClick={() => handleViewProfile(mentor)}
                      >
                        View Full Profile
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <Card className="card-glow">
                <CardContent className="py-12 text-center">
                  <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.mentorAvatar} />
                          <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {session.date} • {session.time}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              <Video className="h-3 w-3 mr-1" />
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="glow" onClick={() => handleJoinSession(session.id)}>
                        <Video className="mr-2 h-4 w-4" />
                        Join Session
                      </Button>
                    </div>
                  ))}

                  {upcomingSessions.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                      <p className="text-muted-foreground mb-4">
                        Book a session with a mentor to get started
                      </p>
                      <Button variant="default">Browse Mentors</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Past Sessions */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Your completed mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No completed sessions yet</h3>
                    <p className="text-muted-foreground">
                      Your session history will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && bookingMentor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowBookingModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setShowBookingModal(false)}
            >
              <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <Card className="card-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Book a Session</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => setShowBookingModal(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Schedule a 1-on-1 session with {bookingMentor.name}</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={bookingMentor.avatar} />
                      <AvatarFallback>{bookingMentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{bookingMentor.name}</p>
                      <p className="text-sm text-muted-foreground">{bookingMentor.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${bookingMentor.hourlyRate}/hr</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Select Time *</Label>
                    <Select value={bookingTime} onValueChange={setBookingTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                        <SelectItem value="17:00">05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Session Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., React Hooks, System Design, etc."
                      value={bookingTopic}
                      onChange={(e) => setBookingTopic(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Share any specific topics or questions you'd like to discuss..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Session Duration</p>
                      <p className="font-medium">1 Hour</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold text-primary">${bookingMentor.hourlyRate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowBookingModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" className="flex-1" onClick={handleConfirmBooking}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedMentor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowProfileModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setShowProfileModal(false)}
            >
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card className="card-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={selectedMentor.avatar} />
                        <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{selectedMentor.name}</CardTitle>
                        <CardDescription className="text-base">{selectedMentor.title}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowProfileModal(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-xl font-bold">{selectedMentor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{selectedMentor.reviews} Reviews</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <Video className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <p className="text-xl font-bold">{selectedMentor.sessionsCompleted}</p>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <p className="text-xl font-bold">{selectedMentor.responseTime}</p>
                      <p className="text-xs text-muted-foreground">Response</p>
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      About
                    </h3>
                    <p className="text-muted-foreground">{selectedMentor.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="font-semibold mb-2">Expertise & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">{selectedMentor.availability}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Hourly Rate</p>
                        <p className="text-3xl font-bold text-primary">${selectedMentor.hourlyRate}</p>
                      </div>
                      <Button variant="default" size="lg" onClick={() => {
                        setShowProfileModal(false);
                        handleBookSession(selectedMentor);
                      }}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && chatMentor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowChatModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setShowChatModal(false)}
            >
              <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <Card className="card-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chatMentor.avatar} />
                        <AvatarFallback>{chatMentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>Message {chatMentor.name}</CardTitle>
                        <CardDescription>Response time: {chatMentor.responseTime}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowChatModal(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      💡 Tip: Be clear about your goals and questions to get the best guidance
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Hi! I'd like to discuss..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      {chatMentor.name} typically responds within {chatMentor.responseTime}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowChatModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" className="flex-1" onClick={handleSendChatMessage}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
