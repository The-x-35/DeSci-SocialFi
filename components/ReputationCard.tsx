"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Star } from "lucide-react";

interface ReputationCardProps {
  reputation: number;
  level: number;
  rank: number;
  totalUsers: number;
  progressToNextLevel: number;
}

export default function ReputationCard({
  reputation = 750,
  level = 3,
  rank = 42,
  totalUsers = 1000,
  progressToNextLevel = 75
}: Partial<ReputationCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Reputation
        </CardTitle>
        <CardDescription>Your standing in the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Reputation</p>
              <p className="text-3xl font-bold">{reputation}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Star className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {progressToNextLevel}% progress to next level
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-1">Level</p>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                <span className="text-xl font-bold">{level}</span>
              </div>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-1">Rank</p>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <span className="text-xl font-bold">{rank}/{totalUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}