import "server-only";
import { db } from "@/lib/db";

export async function listClients() {
  return db.client.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      tagline: true,
      accentColor: true,
      status: true,
      updatedAt: true,
      _count: {
        select: {
          colors: true,
          fonts: true,
          assets: true,
          docs: true,
          updates: true,
        },
      },
    },
  });
}

export async function getClientForAdmin(id: string) {
  return db.client.findUnique({
    where: { id },
    include: {
      colors: { orderBy: { order: "asc" } },
      fonts: { orderBy: { order: "asc" } },
      assets: { orderBy: [{ kind: "asc" }, { order: "asc" }] },
      docs: { orderBy: [{ category: "asc" }, { order: "asc" }] },
      updates: { orderBy: { date: "desc" } },
      testimonials: { orderBy: { createdAt: "desc" } },
    },
  });
}
