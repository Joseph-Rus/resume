"use client";
import React from "react";
import useSWR from "swr"; // Fixed import
import Link from "next/link";
import Image from "next/image";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Projects = () => {
  // SWR fetches your GitHub repos and refreshes every 60 seconds.
  const { data, error, isLoading } = useSWR<Repo[]>(
    "https://api.github.com/users/Joseph-Rus/repos",
    fetcher,
    { refreshInterval: 60000 } // refresh every 60 seconds
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

  // Filter out forked repositories.
  const repos = data.filter((repo) => !repo.fork);

  return (
    <section id="projects" className="py-20 bg-transparent text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-48 w-full bg-gray-200">
                {/* Fallback icon: replace with your image logic if needed */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-500">
                  {index === 0
                    ? "🗄️"
                    : index === 1
                    ? "📚"
                    : index === 2
                    ? "🔋"
                    : index === 3
                    ? "🤖"
                    : "⚙️"}
                </div>
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="https://github.com/Joseph-Rus"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 hover:border-blue-500 text-gray-900 font-medium py-3 px-6 rounded-md transition"
          >
            View More on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
