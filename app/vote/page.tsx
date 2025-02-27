import VoteComponent from "@/components/VoteComponent";

export default function VotePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Vote on Contributions</h1>
        <p className="text-muted-foreground mb-8">
          Review and vote on community contributions. Your votes help identify the most valuable ideas.
        </p>
        <VoteComponent />
      </div>
    </div>
  );
}