import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireClient } from "@/lib/auth";
import { getClientDoc } from "@/lib/portal-data";
import { Markdown } from "@/components/portal/markdown";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const session = await requireClient();
  const { slug } = await params;
  const doc = await getClientDoc(session.clientId, slug);
  return { title: doc?.title ?? "Doc" };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireClient();
  const { slug } = await params;
  const doc = await getClientDoc(session.clientId, slug);
  if (!doc) notFound();

  return (
    <article>
      <Link
        href="/portal/docs"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-[0.78rem]"
      >
        <ArrowLeft className="size-3.5" />
        All docs
      </Link>

      <div className="mb-8 border-b pb-6">
        {doc.category ? (
          <span className="bg-muted text-muted-foreground inline-block rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium">
            {doc.category}
          </span>
        ) : null}
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {doc.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-[0.75rem]">
          Updated {formatDate(doc.updatedAt)}
        </p>
      </div>

      <Markdown>{doc.contentMd}</Markdown>
    </article>
  );
}
