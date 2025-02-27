"use client";

import { useParams } from "next/navigation";
import VoteComponent from "@/components/VoteComponent";

export default function ContributionDetailPage() {
  const params = useParams();
  const contributionId = params.id as string;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Contribution Details</h1>
        <p className="text-muted-foreground mb-8">
          Review and vote on this contribution
        </p>
        <VoteComponent contributionId={contributionId} />
      </div>
    </div>
  );
}