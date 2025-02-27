"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ReputationCard from "@/components/ReputationCard";
import { User, History, Award, Settings } from "lucide-react";
import { Transaction } from "@/lib/solana";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: "tx1",
          amount: 0.5,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: "confirmed",
          type: "vote",
          description: "Voted on contribution #1234",
        },
        {
          id: "tx2",
          amount: 1.0,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: "confirmed",
          type: "submit",
          description: "Submitted contribution #5678",
        },
        {
          id: "tx3",
          amount: 0.25,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          status: "confirmed",
          type: "receive",
          description: "Received reward for contribution",
        },
      ];
      
      setTransactions(mockTransactions);
      setLoading(false);
    };
    
    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
            <div className="w-full md:w-2/3">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-8" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback>8x</AvatarFallback>
                </Avatar>
                <CardTitle>8xH4...3Yfq</CardTitle>
                <CardDescription>Member since April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contributions</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Votes Cast</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-medium">5.23 SOL</span>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <ReputationCard />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="activity">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">
                  <History className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="contributions">
                  <User className="h-4 w-4 mr-2" />
                  Contributions
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent transactions and activities on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(tx.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${tx.type === 'receive' ? 'text-green-600' : tx.type === 'send' ? 'text-red-600' : ''}`}>
                              {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}{tx.amount} SOL
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {tx.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contributions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Contributions</CardTitle>
                    <CardDescription>
                      Contributions you&apos;ve submitted to the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Decentralized Social Media Platform</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted on April 15, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">27 votes</p>
                          <p className="text-xs text-muted-foreground">
                            9 comments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Cross-Chain Asset Transfer Protocol</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted on April 10, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">38 votes</p>
                          <p className="text-xs text-muted-foreground">
                            12 comments
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      Badges and achievements you&apos;ve earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg text-center">
                        <Award className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Early Adopter</p>
                        <p className="text-xs text-muted-foreground">
                          Joined during platform launch
                        </p>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg text-center">
                        <Award className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Top Contributor</p>
                        <p className="text-xs text-muted-foreground">
                          5+ quality contributions
                        </p>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg text-center">
                        <Award className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Active Voter</p>
                        <p className="text-xs text-muted-foreground">
                          Voted on 25+ contributions
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}