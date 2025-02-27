"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Calendar, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface ContributionDetails {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  upvotes: number;
  downvotes: number;
  tags: string[];
  createdAt: Date;
  comments: Comment[];
}

interface VoteComponentProps {
  contributionId?: string;
}

export default function VoteComponent({ contributionId = "1" }: VoteComponentProps) {
  const [contribution, setContribution] = useState<ContributionDetails>({
    id: "1",
    title: "Decentralized Identity Verification System",
    description: "A system that allows users to verify their identity without relying on centralized authorities. This contribution proposes a framework for self-sovereign identity that leverages blockchain technology to give users control over their personal data.\n\nThe system includes:\n- Decentralized identifiers (DIDs)\n- Verifiable credentials\n- Zero-knowledge proofs for privacy\n- Cross-chain compatibility\n\nThis approach solves many of the privacy and security issues with traditional identity systems while maintaining compliance with regulations like GDPR and KYC requirements.",
    author: "0x1234...5678",
    upvotes: 42,
    downvotes: 7,
    tags: ["Identity", "Privacy", "DID", "Blockchain"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    comments: [
      {
        id: "c1",
        author: "0xabcd...ef01",
        content: "This is a great idea! Have you considered how this would work with existing identity providers?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "c2",
        author: "0x9876...5432",
        content: "I'm concerned about the scalability of this approach. How would it handle millions of users?",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ],
  });
  
  const [comment, setComment] = useState("");
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = (voteType: 'up' | 'down') => {
    if (!hasVoted) {
      // First vote
      setContribution(prev => ({
        ...prev,
        upvotes: voteType === 'up' ? prev.upvotes + 1 : prev.upvotes,
        downvotes: voteType === 'down' ? prev.downvotes + 1 : prev.downvotes,
      }));
      setHasVoted(voteType);
      toast.success(`You ${voteType === 'up' ? 'upvoted' : 'downvoted'} this contribution`);
    } else if (hasVoted !== voteType) {
      // Changing vote
      setContribution(prev => ({
        ...prev,
        upvotes: voteType === 'up' ? prev.upvotes + 1 : prev.upvotes - 1,
        downvotes: voteType === 'down' ? prev.downvotes + 1 : prev.downvotes - 1,
      }));
      setHasVoted(voteType);
      toast.success(`You changed your vote to ${voteType === 'up' ? 'upvote' : 'downvote'}`);
    } else {
      // Removing vote
      setContribution(prev => ({
        ...prev,
        upvotes: voteType === 'up' ? prev.upvotes - 1 : prev.upvotes,
        downvotes: voteType === 'down' ? prev.downvotes - 1 : prev.downvotes,
      }));
      setHasVoted(null);
      toast.success("You removed your vote");
    }
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: `c${contribution.comments.length + 1}`,
        author: "0x8xH4...3Yfq", // Current user
        content: comment,
        timestamp: new Date(),
      };
      
      setContribution(prev => ({
        ...prev,
        comments: [newComment, ...prev.comments],
      }));
      
      setComment("");
      setIsSubmitting(false);
      toast.success("Comment added successfully");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{contribution.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {contribution.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(contribution.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={hasVoted === 'up' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleVote('up')}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{contribution.upvotes}</span>
              </Button>
              <Button 
                variant={hasVoted === 'down' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleVote('down')}
                className="flex items-center gap-1"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{contribution.downvotes}</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {contribution.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line">
            {contribution.description}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="comments">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comments">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments ({contribution.comments.length})
          </TabsTrigger>
          <TabsTrigger value="add-comment">
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Comment
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comments" className="mt-4">
          <div className="space-y-4">
            {contribution.comments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
            ) : (
              contribution.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p>{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add-comment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Your Comment</CardTitle>
              <CardDescription>
                Share your thoughts on this contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCommentSubmit} 
                disabled={isSubmitting || !comment.trim()}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}