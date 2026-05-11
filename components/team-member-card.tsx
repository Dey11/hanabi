import Image from "next/image";
import KrishBannerFireflies from "@/components/krish-banner-fireflies";

export type TeamMember = {
  avatarSrc: string;
  bannerSrc?: string;
  fireflies?: boolean;
  name: string;
  quote?: string;
  role: string;
  unoptimizedBanner?: boolean;
};

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="relative min-w-0 text-center">
      <div className="team-mask-hover group relative mx-auto aspect-[430/520] h-12 overflow-visible sm:h-14">
        {member.bannerSrc ? (
          <div className="team-banner-popover pointer-events-none absolute top-[calc(100%+0.7rem)] left-0 z-40 w-56 opacity-0 blur-[2px] transition-[opacity,filter] duration-500 ease-out min-[520px]:left-1/2 min-[520px]:-translate-x-1/2 sm:w-64">
            <div className="relative h-24 overflow-hidden rounded-md shadow-[0_18px_34px_rgba(0,0,0,0.14)] sm:h-28">
              <Image
                src={member.bannerSrc}
                alt=""
                width={512}
                height={288}
                sizes="(min-width: 640px) 16rem, 14rem"
                loading="lazy"
                quality={75}
                unoptimized={member.unoptimizedBanner}
                className="h-full w-full object-cover"
                aria-hidden
              />
              {member.fireflies ? <KrishBannerFireflies /> : null}
            </div>
            {member.quote ? (
              <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] leading-none font-medium tracking-[0.02em] text-black italic sm:text-xs">
                <span className="font-serif text-2xl leading-none text-[#B7B7B7] not-italic">
                  “
                </span>
                <span className="truncate">{member.quote}</span>
                <span className="font-serif text-2xl leading-none text-[#B7B7B7] not-italic">
                  ”
                </span>
              </p>
            ) : null}
          </div>
        ) : null}
        <Image
          src={member.avatarSrc}
          alt=""
          fill
          sizes="(min-width: 640px) 3.5rem, 3rem"
          quality={75}
          className="object-contain"
          aria-hidden
        />
        {member.bannerSrc ? (
          <span className="team-mono-wipe absolute inset-0">
            <Image
              src={member.avatarSrc}
              alt=""
              fill
              sizes="(min-width: 640px) 3.5rem, 3rem"
              quality={75}
              className="object-contain grayscale"
              aria-hidden
            />
          </span>
        ) : null}
      </div>
      <h4 className="mt-3 text-lg leading-tight font-medium text-black sm:text-xl">
        {member.name}
      </h4>
      <p className="mt-1 font-mono text-sm leading-tight font-medium text-[#6C6C6C] uppercase">
        {member.role}
      </p>
    </li>
  );
}
