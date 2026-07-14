import "server-only";
import { db } from "@/lib/db";

/** Full portal payload for the authenticated client's chrome + overview. */
export async function getClientPortal(clientId: string) {
  return db.client.findUnique({
    where: { id: clientId },
    include: {
      colors: { orderBy: { order: "asc" } },
      fonts: { orderBy: { order: "asc" } },
      assets: { orderBy: [{ kind: "asc" }, { order: "asc" }] },
      docs: {
        where: { published: true },
        orderBy: [{ category: "asc" }, { order: "asc" }],
        select: { id: true, title: true, slug: true, category: true },
      },
      updates: { orderBy: { date: "desc" } },
    },
  });
}

/** Lightweight client header info (name, accent, logo) for the sidebar. */
export async function getClientChrome(clientId: string) {
  return db.client.findUnique({
    where: { id: clientId },
    select: {
      name: true,
      slug: true,
      tagline: true,
      accentColor: true,
      logoUrl: true,
    },
  });
}

/** Published docs grouped for the sidebar Docs section. */
export async function getClientDocsList(clientId: string) {
  return db.doc.findMany({
    where: { clientId, published: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
    select: { id: true, title: true, slug: true, category: true },
  });
}

export async function getClientDoc(clientId: string, slug: string) {
  return db.doc.findFirst({
    where: { clientId, slug, published: true },
  });
}
