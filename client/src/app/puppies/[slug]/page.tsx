import { notFound } from "next/navigation";
import { fetchPuppyBySlug } from "@/lib/api";
import { PuppyDetailClient } from "@/components/puppies/PuppyDetailClient";

export const dynamic = "force-dynamic";

interface PuppyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PuppyDetailPage({ params }: PuppyDetailPageProps) {
  const { slug } = await params;
  const result = await fetchPuppyBySlug(slug);

  if (!result) {
    notFound();
  }

  return <PuppyDetailClient puppy={result.puppy} related={result.related} />;
}

