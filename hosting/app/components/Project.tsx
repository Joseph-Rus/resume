// components/Projects.tsx
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      title: "SQL Database Server",
      description: "Designed and deployed a SQL database server on AWS infrastructure with secure database management practices and optimized query performance.",
      image: "/images/projects/database.png",
      tags: ["AWS", "SQL", "Jira"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "College Study Mate",
      description: "Created a comprehensive study platform for college students to collaborate and share resources with user authentication and intuitive interface.",
      image: "/images/projects/study-mate.png",
      tags: ["Web Development", "Database Design"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "Formula SAE EV Battery System",
      description: "Designed and implemented battery management system (BMS) for Formula SAE electric vehicle with embedded code for monitoring and control systems.",
      image: "/images/projects/battery.png",
      tags: ["C++", "Embedded Systems"],
      status: "Completed",
      link: "#"
    },
    {
      title: "FIRST Robotics Competition Projects",
      description: "Led additive manufacturing initiatives for two years and implemented control systems for competition robots using C++ and embedded programming.",
      image: "/images/projects/robotics.png",
      tags: ["C++", "Hardware Integration"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Igris",
      description: "Advanced project highlighting innovative technology integration and creative problem-solving skills.",
      image: "/images/projects/igris.png",
      tags: ["Advanced Technology", "Innovation"],
      status: "New",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 bg-gray-700 relative">
                {/* Replace with actual project images */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-500">
                  {index === 0 ? '🗄️' : index === 1 ? '📚' : index === 2 ? '🔋' : index === 3 ? '🤖' : '⚙️'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === "Completed" 
                      ? "bg-green-900 text-green-300" 
                      : project.status === "In Progress" 
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-purple-900 text-purple-300"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={project.link}>
                  <span className="text-orange-500 hover:text-orange-400 text-sm font-medium inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/projects">
            <span className="border border-gray-700 hover:border-orange-500 text-white font-medium py-3 px-6 rounded-md transition">
              View More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;