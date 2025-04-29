"use client";
import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBracketIcon, GlobeAltIcon, ServerIcon } from "@heroicons/react/24/outline";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  const { data, error, isLoading } = useSWR<Repo[]>(
    "https://api.github.com/users/Joseph-Rus/repos",
    fetcher,
    { refreshInterval: 60000 }
  );

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="projects" className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-red-600">Failed to load projects.</p>
        </div>
      </section>
    );
  }

  const repos = data.filter((repo) => !repo.fork);

  const chooseIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("api") || lower.includes("data")) return ServerIcon;
    if (lower.includes("web") || lower.includes("site") || lower.includes("portfolio")) return GlobeAltIcon;
    if (lower.includes("server") || lower.includes("backend")) return ServerIcon;
    return CodeBracketIcon;
  };

  return (
    <section id="projects" className="py-20 bg-transparent text-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => {
            const IconComp = chooseIcon(repo.name);
            return (
              <motion.div
                key={repo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                variants={cardVariants}
              >
                <div className="flex items-center justify-center h-48 w-full bg-gray-200">
                  <IconComp className="w-12 h-12 text-gray-500" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                  <p className="text-gray-700 mb-4">
                    {repo.description || "No description provided."}
                  </p>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium inline-flex items-center"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7-7 7M3 12h18"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: repos.length * 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://github.com/Joseph-Rus"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 hover:border-blue-500 text-gray-900 font-medium py-3 px-6 rounded-md transition"
          >
            View More on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;