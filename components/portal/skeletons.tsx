import { cn } from "@/lib/utils";

/** A single shimmering block. */
function Bar({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-md", className)} />;
}

function PageHead({ wide = false }: { wide?: boolean }) {
  return (
    <div className="mb-8">
      <Bar className="h-7 w-40" />
      {wide ? <Bar className="mt-2 h-4 w-72" /> : null}
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <div>
      <Bar className="h-5 w-24 rounded-full" />
      <Bar className="mt-3 h-9 w-56" />
      <Bar className="mt-2 h-4 w-64" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bar key={i} className="h-[7.5rem] rounded-2xl" />
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Bar className="h-4 w-48" />
            <Bar className="h-3 w-full max-w-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandSkeleton() {
  return (
    <div>
      <PageHead wide />
      <Bar className="h-4 w-16" />
      <Bar className="mt-4 h-5 w-14 rounded-full" />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bar key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function AssetsSkeleton() {
  return (
    <div>
      <PageHead wide />
      <Bar className="h-4 w-20" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} className="aspect-[16/10] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function DocsSkeleton() {
  return (
    <div>
      <PageHead wide />
      <Bar className="h-5 w-24 rounded-full" />
      <div className="mt-3 flex flex-col gap-px overflow-hidden rounded-2xl border">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} className="h-12 rounded-none" />
        ))}
      </div>
    </div>
  );
}

export function DocSkeleton() {
  return (
    <div>
      <Bar className="h-4 w-20" />
      <Bar className="mt-6 h-5 w-16 rounded-full" />
      <Bar className="mt-3 h-9 w-72" />
      <Bar className="mt-3 h-3 w-32" />
      <div className="mt-8 flex flex-col gap-3 border-t pt-8">
        {["w-full", "w-11/12", "w-4/5", "w-full", "w-3/4"].map((w, i) => (
          <Bar key={i} className={cn("h-4", w)} />
        ))}
      </div>
    </div>
  );
}

export function UpdatesSkeleton() {
  return (
    <div>
      <PageHead wide />
      <Bar className="h-4 w-28" />
      <ol className="mt-5 ml-1 flex flex-col gap-8 border-l pl-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-2">
            <Bar className="h-4 w-52" />
            <Bar className="h-3 w-full max-w-md" />
          </li>
        ))}
      </ol>
    </div>
  );
}
