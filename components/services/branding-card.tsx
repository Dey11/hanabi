"use client";

export function BrandingCard() {
  return (
    <div
      style={{
        backgroundImage: "url('/gradients/mesh3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex size-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-5"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-black/60 px-2.5 py-0.5 text-sm font-medium text-white">
            Logo & Brand Identity
          </div>
          <div className="rounded-full bg-black/60 px-2.5 py-0.5 text-sm font-medium text-white">
            Brand Strategy
          </div>
        </div>
        <h4 className="text-2xl font-medium">Branding</h4>
        <p>
          We craft beautiful, intuitive interfaces for websites, apps, and
          digital platforms.
        </p>
      </div>
    </div>
  );
}
