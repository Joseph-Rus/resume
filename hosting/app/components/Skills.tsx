"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { FaLock, FaShieldAlt, FaMicrochip } from "react-icons/fa";

const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      { name: "C++", icon: CodeBracketIcon },
      { name: "C", icon: CodeBracketIcon },
      { name: "Java", icon: CodeBracketIcon },
      { name: "Python", icon: CodeBracketIcon },
      { name: "HTML", icon: GlobeAltIcon },
      { name: "JavaScript", icon: CodeBracketIcon },
      { name: "Node.js", icon: CodeBracketIcon },
      { name: "SQL", icon: CodeBracketIcon },
      { name: "React", icon: CodeBracketIcon },
      { name: "Swift", icon: CodeBracketIcon },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      { name: "AutoCAD", icon: DocumentTextIcon },
      { name: "SolidWorks", icon: DocumentTextIcon },
      { name: "Linux (Ubuntu, Kali)", icon: CommandLineIcon },
      { name: "Excel", icon: ChartBarIcon },
      { name: "Jira", icon: DocumentTextIcon },
      { name: "Firebase", icon: DocumentTextIcon },
    ],
  },
  {
    name: "Cybersecurity",
    skills: [
      { name: "Hack The Box", icon: FaLock },
      { name: "Kali Linux", icon: CommandLineIcon },
      { name: "System Penetration Testing for linux", icon: FaShieldAlt },
    ],
  },
  {
    name: "Manufacturing",
    skills: [
      { name: "CNC Operation", icon: Cog6ToothIcon },
      { name: "Equipment Setup", icon: Cog6ToothIcon },
      { name: "Engineering Drawings", icon: DocumentTextIcon },
    ],
  },
  {
    name: "Development",
    skills: [
      { name: "Web Development", icon: GlobeAltIcon },
      { name: "Embedded Systems", icon: FaMicrochip },
      { name: "iOS App Development", icon: DevicePhoneMobileIcon },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-transparent text-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>

        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            className="mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.3 }}
            variants={cardVariants}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={sIdx}
                    className="flex items-center space-x-2 bg-white shadow-sm hover:shadow-md transition p-3 rounded-lg border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 + sIdx * 0.1 }}
                    variants={cardVariants}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
