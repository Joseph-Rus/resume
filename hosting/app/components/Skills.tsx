// components/Skills.tsx

const Skills = () => {
    const skillCategories = [
      {
        name: "Programming Languages",
        skills: [
          { name: "C++", icon: "💻", color: "bg-blue-900" },
          { name: "C", icon: "💻", color: "bg-blue-800" },
          { name: "Java", icon: "☕", color: "bg-orange-800" },
          { name: "Python", icon: "🐍", color: "bg-yellow-700" },
          { name: "HTML", icon: "🌐", color: "bg-red-700" },
          { name: "JavaScript", icon: "🟨", color: "bg-yellow-600" },
          { name: "Node.js", icon: "🟢", color: "bg-green-700" }
        ]
      },
      {
        name: "Tools & Technologies",
        skills: [
          { name: "AutoCAD", icon: "📐", color: "bg-blue-700" },
          { name: "SolidWorks", icon: "🔧", color: "bg-gray-700" },
          { name: "Linux", icon: "🐧", color: "bg-black" },
          { name: "Excel", icon: "📊", color: "bg-green-800" }
        ]
      },
      {
        name: "Cybersecurity",
        skills: [
          { name: "Hack The Box", icon: "🔒", color: "bg-green-900" },
          { name: "Kali Linux", icon: "🐉", color: "bg-blue-900" },
          { name: "Penetration Testing", icon: "🛡️", color: "bg-red-900" }
        ]
      },
      {
        name: "Development",
        skills: [
          { name: "Web Development", icon: "🌐", color: "bg-indigo-800" },
          { name: "Embedded Systems", icon: "🔌", color: "bg-gray-800" },
          { name: "Computer Science", icon: "🖥️", color: "bg-violet-800" }
        ]
      }
    ];
  
    return (
      <section id="skills" className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">My Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">{category.name}</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className={`${skill.color} bg-opacity-20 rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105`}
                    >
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <div className="text-sm text-center">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-orange-500">Professional Skills</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Problem Solving",
                "Communication",
                "Customer Service",
                "Project Management",
                "Technical Documentation",
                "Equipment Maintenance",
                "Jira",
                "Resource Coordination"
              ].map((skill, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-3 text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;