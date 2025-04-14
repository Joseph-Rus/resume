import React from "react";

const Skills = () => {
  // Example data with "level" added to each skill.
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "C++", icon: "💻", level: 60, color: "bg-blue-600" },
        { name: "C", icon: "💻", level: 40, color: "bg-blue-500" },
        { name: "Java", icon: "☕", level: 70, color: "bg-orange-600" },
        { name: "Python", icon: "🐍", level: 90, color: "bg-yellow-600" },
        { name: "HTML", icon: "🌐", level: 95, color: "bg-red-500" },
        { name: "JavaScript", icon: "🟨", level: 75, color: "bg-yellow-500" },
        { name: "Node.js", icon: "🟢", level: 70, color: "bg-green-600" },
      ],
    },
    {
      name: "Tools & Technologies",
      skills: [
        { name: "AutoCAD", icon: "📐", level: 85, color: "bg-blue-500" },
        { name: "SolidWorks", icon: "🔧", level: 90, color: "bg-gray-500" },
        { name: "Linux", icon: "🐧", level: 80, color: "bg-black" },
        { name: "Excel", icon: "📊", level: 75, color: "bg-green-700" },
      ],
    },
    {
      name: "Cybersecurity",
      skills: [
        { name: "Hack The Box", icon: "🔒", level: 70, color: "bg-green-600" },
        { name: "Kali Linux", icon: "🐉", level: 65, color: "bg-blue-600" },
        { name: "Penetration Testing", icon: "🛡️", level: 75, color: "bg-red-600" },
      ],
    },
    {
      name: "Development",
      skills: [
        { name: "Web Development", icon: "🌐", level: 90, color: "bg-indigo-600" },
        { name: "Embedded Systems", icon: "🔌", level: 70, color: "bg-gray-600" },
      ],
    },
  ];

  const professionalSkills = [

  ];

  return (
    <section id="skills" className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My Skills
        </h2>

        {/* Skill Categories */}
        {skillCategories.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx}>
                  {/* Skill row header (icon + name + percentage) */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  {/* Progress bar container: unachieved portion is white */}
                  <div className="w-full bg-white rounded-full h-2.5 border border-gray-300">
                    {/* Progress bar fill: achieved portion is black */}
                    <div
                      className="bg-black h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Professional Skills */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Professional Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professionalSkills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2.5 border border-gray-300">
                  <div
                    className="bg-black h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
