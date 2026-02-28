import Image from "next/image";

export default function ServiceCards() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 pt-10">
      <DevelopmentCard />
    </div>
  );
}

function DevelopmentCard() {
  return (
    <div
      style={{
        backgroundImage: "url('/mesh1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex size-[400px] flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md"
    >
      <div className="flex-1">
        <Image
          src="/logo-dark.png"
          alt="Hanabi Logo"
          width={100}
          height={100}
          className="absolute inset-x-0 top-1/4 m-auto"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#7D5103]/80 px-2.5 py-0.5 text-sm font-medium text-white">
            Automation
          </div>
          <div className="rounded-full bg-[#7D5103]/80 px-2.5 py-0.5 text-sm font-medium text-white">
            Web & App
          </div>
          <div className="rounded-full bg-[#7D5103]/80 px-2.5 py-0.5 text-sm font-medium text-white">
            MVP
          </div>
        </div>
        <h4 className="text-2xl font-medium">Development</h4>
        <p>
          We craft beautiful, intuitive interfaces for websites, apps, and
          digital platforms.
        </p>
      </div>
    </div>
  );
}
