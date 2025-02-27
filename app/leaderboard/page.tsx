"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Trophy, TrendingUp } from "lucide-react";

interface LeaderboardUser {
  id: string;
  address: string;
  reputation: number;
  contributions: number;
  votes: number;
}

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    // Simulate loading leaderboard data
    const loadLeaderboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock leaderboard data
      const mockUsers: LeaderboardUser[] = [
        {
          id: "user1",
          address: "0xabcd...ef01",
          reputation: 1250,
          contributions: 12,
          votes: 87,
        },
        {
          id: "user2",
          address: "0x1234...5678",
          reputation: 980,
          contributions: 8,
          votes: 65,
        },
        {
          id: "user3",
          address: "0x9876...5432",
          reputation: 920,
          contributions: 7,
          votes: 72,
        },
        {
          id: "user4",
          address: "0xfedc...ba98",
          reputation: 850,
          contributions: 6,
          votes: 58,
        },
        {
          id: "user5",
          address: "0x8xH4...3Yfq", // Current user
          reputation: 750,
          contributions: 7,
          votes: 42,
        },
        {
          id: "user6",
          address: "0x2468...1357",
          reputation: 720,
          contributions: 5,
          votes: 51,
        },
        {
          id: "user7",
          address: "0x1357...2468",
          reputation: 680,
          contributions: 4,
          votes: 48,
        },
        {
          id: "user8",
          address: "0xaaaa...bbbb",
          reputation: 650,
          contributions: 6,
          votes: 32,
        },
        {
          id: "user9",
          address: "0xcccc...dddd",
          reputation: 620,
          contributions: 3,
          votes: 45,
        },
        {
          id: "user10",
          address: "0xeeee...ffff",
          reputation: 590,
          contributions: 4,
          votes: 38,
        },
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    };
    
    loadLeaderboardData();
  }, []);

  const renderLeaderboard = (sortBy: 'reputation' | 'contributions' | 'votes') => {
    const sortedUsers = [...users].sort((a, b) => b[sortBy] - a[sortBy]);
    
    return (
      <div className="space-y-4">
        {sortedUsers.map((user, index) => (
          <div 
            key={user.id} 
            className={`flex items-center justify-between p-4 rounded-lg ${
              user.address === "0x8xH4...3Yfq" ? "bg-primary/10" : index < 3 ? "bg-secondary/50" : "border"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold">
                {index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>{user.address.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.address}</p>
                <p className="text-sm text-muted-foreground">
                  {sortBy === 'reputation' 
                    ? `${user.contributions} contributions, ${user.votes} votes`
                    : sortBy === 'contributions'
                    ? `${user.reputation} reputation, ${user.votes} votes`
                    : `${user.reputation} reputation, ${user.contributions} contributions`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl">
                {user[sortBy]}
              </p>
              <p className="text-xs text-muted-foreground">
                {sortBy === 'reputation' 
                  ? 'reputation'
                  : sortBy === 'contributions'
                  ? 'contributions'
                  : 'votes'
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors and community members
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                  Ranked by reputation, contributions, and votes
                </CardDescription>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reputation">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reputation">
                  <Award className="h-4 w-4 mr-2" />
                  Reputation
                </TabsTrigger>
                <TabsTrigger value="contributions">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Contributions
                </TabsTrigger>
                <TabsTrigger value="votes">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Votes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reputation" className="mt-6">
                {renderLeaderboard('reputation')}
              </TabsContent>
              
              <TabsContent value="contributions" className="mt-6">
                {renderLeaderboard('contributions')}
              </TabsContent>
              
              <TabsContent value="votes" className="mt-6">
                {renderLeaderboard('votes')}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}