"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/reveal";
import WorkCard from "@/components/work-card";
import type { WorkProject } from "@/data/work-projects";

const INITIAL_VISIBLE_PROJECTS = 3;

type WorkProjectsListProps = {
  projects: readonly WorkProject[];
};

export default function WorkProjectsList({ projects }: WorkProjectsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMoreProjects = projects.length > INITIAL_VISIBLE_PROJECTS;
  const initialProjects = projects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const additionalProjects = projects.slice(INITIAL_VISIBLE_PROJECTS);
  const nextProject = additionalProjects[0];
  const showAdditionalProjects = isExpanded || isCollapsing;

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  const expandProjects = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    setIsCollapsing(false);
    setIsExpanded(true);
  };

  const collapseProjects = () => {
    setIsCollapsing(true);
    collapseTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setIsCollapsing(false);
      collapseTimeoutRef.current = null;
    }, 180);
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

      {hasMoreProjects && !isExpanded && (
        <div className="relative w-full overflow-hidden pt-12">
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
            className="font-inter absolute top-8 left-1/2 z-10 inline-flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-linear-to-b from-white from-35% to-neutral-100 px-2 py-1 text-base font-medium text-black shadow-sm inset-shadow-2xs inset-shadow-white/70 backdrop-blur-sm transition-transform duration-75 text-shadow-2xs focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F6F6] focus-visible:outline-none active:scale-95"
            aria-expanded={isExpanded}
          >
            See more
          </button>
        </div>
      )}

      {showAdditionalProjects && (
        <div
          id="additional-work-projects"
          className={`mt-16 flex w-full flex-col items-center gap-16 transition-[opacity,transform] duration-180 ease-out md:mt-20 md:gap-20 ${
            isCollapsing ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
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

          <button
            type="button"
            onClick={collapseProjects}
            className="font-inter inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-linear-to-b from-white from-35% to-neutral-100 px-3 py-1.5 text-base font-medium text-black shadow-sm inset-shadow-2xs inset-shadow-white/70 backdrop-blur-sm transition-transform duration-150 ease-out text-shadow-2xs hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F6F6] focus-visible:outline-none active:scale-[0.96]"
            aria-controls="additional-work-projects"
            aria-expanded={isExpanded}
            disabled={isCollapsing}
          >
            See less
          </button>
        </div>
      )}
    </div>
  );
}
