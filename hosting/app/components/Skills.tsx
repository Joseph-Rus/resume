import React from "react";
import {
  CodeBracketIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { FaLock, FaShieldAlt, FaMicrochip } from "react-icons/fa";

const Skills = () => {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "C++", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
        { name: "C", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Java", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Python", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
        { name: "HTML", icon: <GlobeAltIcon className="w-5 h-5 text-gray-600" /> },
        { name: "JavaScript", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Node.js", icon: <CodeBracketIcon className="w-5 h-5 text-gray-600" /> },
      ],
    },
    {
      name: "Tools & Technologies",
      skills: [
        { name: "AutoCAD", icon: <DocumentTextIcon className="w-5 h-5 text-gray-600" /> },
        { name: "SolidWorks", icon: <DocumentTextIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Linux", icon: <CommandLineIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Excel", icon: <ChartBarIcon className="w-5 h-5 text-gray-600" /> },
      ],
    },
    {
      name: "Cybersecurity",
      skills: [
        { name: "Hack The Box", icon: <FaLock className="w-5 h-5 text-gray-600" /> },
        { name: "Kali Linux", icon: <CommandLineIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Penetration Testing", icon: <FaShieldAlt className="w-5 h-5 text-gray-600" /> },
      ],
    },
    {
      name: "Development",
      skills: [
        { name: "Web Development", icon: <GlobeAltIcon className="w-5 h-5 text-gray-600" /> },
        { name: "Embedded Systems", icon: <FaMicrochip className="w-5 h-5 text-gray-600" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-transparent text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My Skills
        </h2>

        {skillCategories.map((category, idx) => (
          <div key={idx} className="mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center space-x-2 bg-white shadow-sm hover:shadow-md transition p-3 rounded-lg border border-gray-200"
                >
                  {skill.icon}
                  <span className="text-sm font-medium text-gray-800">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;