import Header from "@/components/header";
import MarqueeComponent from "@/components/marquee-component";
import ServiceCards from "@/components/services/service-cards";
import WhyUsCards from "@/components/why-us-cards";

export default function Home() {
  return (
    <main className="font-inter">
      <section
        id="hero"
        className="flex min-h-screen flex-col items-center justify-center text-center text-pretty"
      >
        <div className="absolute top-0 left-0 w-full">
          <Header />
        </div>

        <h1 className="font-inter mt-20 max-w-xl text-5xl font-medium">
          Your Digital Impression. Simple and Beautiful
        </h1>

        <h2 className="max-w-2xl pt-5 text-lg font-medium text-[#6C6C6C]">
          We build refreshingly simple and beautiful websites and digital
          experiences that captivate your audience and elevate your brand.
        </h2>

        <div className="flex gap-8 pt-5">
          <button className="text-background font-inter group relative cursor-pointer overflow-hidden rounded-full border border-[#FF2500] p-1 px-4 text-lg font-medium transition-transform duration-50 active:scale-95">
            <span
              className="absolute inset-0 bg-linear-to-b from-[#FF2500] from-30% via-50% to-[#FF9900] to-80% inset-shadow-2xs inset-shadow-[#FF9900]"
              aria-hidden
            />
            <span
              className="absolute inset-0 bg-linear-to-t from-[#FF9900] from-30% via-80% to-[#FF2500] to-120% opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full inset-shadow-sm inset-shadow-[#FF2500]"
              aria-hidden
            />
            <span className="relative z-10 text-shadow-[#FF2500] text-shadow-xs">
              Book an Intro call
            </span>
          </button>
          <button className="font-medium">Recent works</button>
        </div>

        <div className="mt-10">
          <MarqueeComponent />
        </div>
      </section>

      <section
        id="services"
        className="flex flex-col items-center justify-center bg-[#F4F3F3] px-5 py-10"
      >
        <h3 className="font-mono text-2xl font-medium text-[#6C6C6C]">
          Our Services
        </h3>

        <h2 className="pt-8 text-center text-4xl font-medium leading-tight">
          We specialise in making things
          <br />
          <span className="italic">simply beautiful.</span>
        </h2>

        <ServiceCards />
      </section>

      <section
        id="why-us"
        className="flex flex-col items-center justify-center bg-[#F4F3F3] px-5 py-10"
      >
        <h3 className="font-mono text-2xl font-medium text-[#6C6C6C]">
          Why Us
        </h3>

        <h2 className="pt-8 text-center text-4xl font-medium leading-tight">
          The Hanabi Difference
        </h2>

        <WhyUsCards />
      </section>
    </main>
  );
}
