"use client";

import { useState } from "react";

import HangingPaperCranes from "@/components/hanging-paper-cranes";
import { Reveal } from "@/components/reveal";
import WorkCard from "@/components/work-card";
import type { WorkProject } from "@/data/work-projects";

const INITIAL_VISIBLE_PROJECTS = 3;
const revealToggleButtonClass =
  "font-inter z-10 inline-flex cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-[#FDFDFD] to-[#F1F1F1]/0 p-px text-base font-medium text-[#303030] shadow-[0_2px_4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.16)] transition-transform duration-75 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F6F6] focus-visible:outline-none active:scale-95";
const revealToggleButtonInnerClass = "rounded-full bg-[#E3E3E3]/80 px-5 py-1";

type WorkProjectsListProps = {
  projects: readonly WorkProject[];
};

export default function WorkProjectsList({ projects }: WorkProjectsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreProjects = projects.length > INITIAL_VISIBLE_PROJECTS;
  const initialProjects = projects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const additionalProjects = projects.slice(INITIAL_VISIBLE_PROJECTS);
  const nextProject = additionalProjects[0];

  const expandProjects = () => {
    setIsExpanded(true);
  };

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

      {!isExpanded && (
        <div className="-mt-14 -mb-8 w-full md:hidden">
          <HangingPaperCranes className="h-[260px]" />
        </div>
      )}

      {hasMoreProjects && !isExpanded && (
        <div className="relative mt-12 w-full overflow-hidden">
          {nextProject && (
            <div
              aria-hidden="true"
              className="pointer-events-none h-56 w-full overflow-hidden opacity-65 blur-[3px] sm:h-64"
            >
              <div className="-translate-y-2">
                <WorkCard {...nextProject} />
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-linear-to-b from-[#F6F6F6] from-0% via-[#F6F6F6]/65 via-45% to-[#F6F6F6] to-100% backdrop-blur-[1px]"
          />
          <button
            type="button"
            onClick={expandProjects}
            className={`absolute top-16 left-1/2 -translate-x-1/2 ${revealToggleButtonClass}`}
            aria-expanded={isExpanded}
          >
            <span className={revealToggleButtonInnerClass}>See more</span>
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
          <div className="-mt-14 -mb-8 w-full md:hidden">
            <HangingPaperCranes className="h-[260px]" />
          </div>
        </div>
      )}
    </div>
  );
}
