/* 
    Hey! This is where I show off what I'm currently learning.
    It's basically a grid of fancy cards - each one has an icon,
    the tech/project name, what it's about, and a link to check
    it out if you're interested.
*/

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import type { TechnologyLearning } from "@/types";

interface CurrentLearningProps {
  technologies: TechnologyLearning[];
}

const CurrentLearning: React.FC<CurrentLearningProps> = ({ technologies }) => {
  return (
    <Card className="border-2 border-muted bg-background/60 backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
      <CardHeader className="space-y-2 sm:space-y-3">
        <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Current Learning Journey
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground/80 italic">
          Projects and technologies I'm currently exploring
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="group relative overflow-hidden border border-muted hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-background/60 backdrop-blur-sm cursor-pointer"
            >
              <CardContent className="p-4 sm:p-6 relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed mb-3 sm:mb-4">
                  {tech.description}
                </p>
                {tech.repoLink && (
                  <a
                    href={tech.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[10px] sm:text-xs font-medium text-primary hover:text-primary/80 transition-colors gap-1.5 group/link"
                  >
                    View Project{" "}
                    <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentLearning;
