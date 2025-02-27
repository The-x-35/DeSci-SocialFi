import ContributionForm from "@/components/ContributionForm";

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submit a Contribution</h1>
        <p className="text-muted-foreground mb-8">
          Share your ideas, projects, or proposals with the community. Quality contributions earn reputation points.
        </p>
        <ContributionForm />
      </div>
    </div>
  );
}