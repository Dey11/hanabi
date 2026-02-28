import Header from "@/components/header";
import MarqueeComponent from "@/components/marquee-component";
import ServiceCards from "@/components/services/service-cards";

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
          <button className="text-background font-inter cursor-pointer rounded-full bg-gradient-to-b from-[#FF2500] to-[#FF9900] p-1 px-4 text-lg font-medium inset-shadow-sm inset-shadow-[#FF2500]">
            Book an Intro call
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

        <h2 className="pt-8 text-center text-4xl font-medium">
          We specialise in making things
          <br />
          <span className="italic">simply beautiful.</span>
        </h2>

        <ServiceCards />
      </section>
    </main>
  );
}
