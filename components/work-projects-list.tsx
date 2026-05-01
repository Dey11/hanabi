"use client";

import { useState } from "react";

import { Reveal } from "@/components/reveal";
import WorkCard from "@/components/work-card";
import type { WorkProject } from "@/data/work-projects";

const INITIAL_VISIBLE_PROJECTS = 3;

type WorkProjectsListProps = {
  projects: readonly WorkProject[];
};

export default function WorkProjectsList({ projects }: WorkProjectsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreProjects = projects.length > INITIAL_VISIBLE_PROJECTS;
  const initialProjects = projects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const additionalProjects = projects.slice(INITIAL_VISIBLE_PROJECTS);
  const nextProject = additionalProjects[0];

  return (
    <div className="mt-12 flex w-full max-w-6xl flex-col items-center">
      <div className="flex w-full flex-col items-center gap-16 md:gap-20">
        {initialProjects.map((project, idx) => (
          <Reveal
            key={project.title}
            className="w-full"
            delay={Math.min(0.04 * idx, 0.16)}
          >
            <WorkCard {...project} />
          </Reveal>
        ))}
      </div>

      {hasMoreProjects && !isExpanded && (
        <div className="relative w-full overflow-hidden pt-12">
          {nextProject && (
            <div
              aria-hidden="true"
              className="pointer-events-none h-56 w-full overflow-hidden opacity-55 blur-[5px] sm:h-64"
            >
              <div className="-translate-y-2">
                <WorkCard {...nextProject} />
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-linear-to-b from-[#F6F6F6] from-0% via-[#F6F6F6]/80 via-45% to-[#F6F6F6] to-100% backdrop-blur-[2px]"
          />
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="font-inter absolute top-6 left-1/2 z-10 inline-flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-linear-to-b from-white from-35% to-neutral-100 px-2 py-1 text-base font-medium text-black shadow-sm inset-shadow-2xs inset-shadow-white/70 backdrop-blur-sm transition-transform duration-75 text-shadow-2xs focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F6F6] focus-visible:outline-none active:scale-95"
            aria-expanded={isExpanded}
          >
            See more
          </button>
        </div>
      )}

      {isExpanded && (
        <div
          id="additional-work-projects"
          className="mt-16 flex w-full flex-col items-center gap-16 md:mt-20 md:gap-20"
        >
          {additionalProjects.map((project, idx) => (
            <Reveal
              key={project.title}
              className="w-full"
              delay={Math.min(0.04 * (idx + INITIAL_VISIBLE_PROJECTS), 0.16)}
            >
              <WorkCard {...project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
