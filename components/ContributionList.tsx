"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsUp, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";

interface Contribution {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
}

export default function ContributionList() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchContributions = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockContributions: Contribution[] = [
        {
          id: "1",
          title: "Decentralized Identity Verification System",
          description: "A system that allows users to verify their identity without relying on centralized authorities.",
          author: "0x1234...5678",
          votes: 42,
          comments: 7,
          tags: ["Identity", "Privacy", "DID"],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          id: "2",
          title: "Cross-Chain Asset Transfer Protocol",
          description: "A protocol that enables seamless transfer of assets between different blockchain networks.",
          author: "0xabcd...ef01",
          votes: 38,
          comments: 12,
          tags: ["Interoperability", "DeFi", "Protocol"],
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
          id: "3",
          title: "Decentralized Social Media Platform",
          description: "A social media platform built on blockchain that gives users control over their data and content.",
          author: "0x9876...5432",
          votes: 27,
          comments: 9,
          tags: ["Social", "Content", "Privacy"],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        },
      ];
      
      setContributions(mockContributions);
      setLoading(false);
    };
    
    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contributions.map((contribution) => (
        <Card key={contribution.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/contribution/${contribution.id}`} className="hover:underline">
                {contribution.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span>By {contribution.author}</span>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(contribution.createdAt).toLocaleDateString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{contribution.description}</p>
            <div className="flex flex-wrap gap-2">
              {contribution.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {contribution.votes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {contribution.comments}
              </span>
            </div>
            <Button asChild variant="outline">
              <Link href={`/vote?id=${contribution.id}`}>
                Vote
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}