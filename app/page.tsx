import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Award, Vote, PenSquare } from "lucide-react";
import ContributionList from "@/components/ContributionList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          Contribute, Vote, Earn Reputation
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mb-8">
          A decentralized platform for submitting contributions and voting on the best ideas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/submit">
              Submit Contribution <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/vote">
              Vote on Contributions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <PenSquare className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Submit</CardTitle>
            <CardDescription>Share your ideas and contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and submit your contributions to the community. Provide detailed information about your idea or project.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/submit">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <Vote className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Vote</CardTitle>
            <CardDescription>Support the best contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Review and vote on contributions from the community. Help identify the most valuable ideas.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/vote">Vote Now</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <Award className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Earn</CardTitle>
            <CardDescription>Build your reputation</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Earn reputation points for your contributions and participation. Climb the leaderboard and gain recognition.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Recent Contributions</h2>
        <ContributionList />
      </section>
    </div>
  );
}