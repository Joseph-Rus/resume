// components/Experience.tsx

const Experience = () => {
    const experiences = [
      {
        year: "2024",
        role: "Audio Visual Technician",
        company: "California Baptist University",
        location: "Riverside, CA",
        description: "Maintain and manage sophisticated audiovisual equipment across campus facilities. Provide technical support and troubleshooting services to faculty and staff. Implement preventive maintenance procedures to extend equipment lifespan.",
        current: true
      },
      {
        year: "2022-2023",
        role: "Customer Service Representative",
        company: "Uhaul Moving and Storage",
        location: "Location, CA",
        description: "Delivered exceptional customer service by managing complex moving and storage requirements. Facilitated seamless customer interactions throughout the entire moving process. Developed expertise in logistics coordination and problem-solving.",
        current: false
      },
      {
        year: "2021-2022",
        role: "CNC Operator",
        company: "RPG Offroad Inc",
        location: "Location, CA",
        description: "Operated advanced CNC machinery to produce high-precision components. Interpreted complex technical blueprints and engineering specifications. Managed equipment calibration and setup procedures.",
        current: false
      }
    ];
  
    const education = [
      {
        year: "2023-2027",
        degree: "Bachelor of Science in Computer Science",
        institution: "California Baptist University",
        location: "Riverside, CA",
        details: "GPA: 3.7",
        current: true
      }
    ];
  
    return (
      <section id="experience" className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Experience</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute h-full w-0.5 bg-gray-700 left-0 ml-6 md:left-1/2 md:-ml-0.5"></div>
            
            {/* Experience Items */}
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div key={index} className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-12 h-12 -ml-6 md:-ml-6 bg-gray-800 rounded-full border-4 border-orange-500 flex items-center justify-center">
                      <span className="text-orange-500 font-bold text-sm">{exp.year.split('-')[0]}</span>
                    </div>
                    
                    {/* Content for desktop (alternate left-right) */}
                    <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12">
                      {index % 2 === 0 ? (
                        <div className="md:text-right">
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <div className="text-orange-500 mb-2">{exp.company} | {exp.location}</div>
                          <div className="text-sm text-gray-400">{exp.year}</div>
                          <p className="mt-3 text-gray-300">{exp.description}</p>
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 md:pl-12">
                      {index % 2 === 1 ? (
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <div className="text-orange-500 mb-2">{exp.company} | {exp.location}</div>
                          <div className="text-sm text-gray-400">{exp.year}</div>
                          <p className="mt-3 text-gray-300">{exp.description}</p>
                        </div>
                      ) : null}
                    </div>
                    
                    {/* Mobile version (always on right) */}
                    <div className="md:hidden">
                      {index % 2 === 1 ? (
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <div className="text-orange-500 mb-2">{exp.company} | {exp.location}</div>
                          <div className="text-sm text-gray-400">{exp.year}</div>
                          <p className="mt-3 text-gray-300">{exp.description}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Education */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-12 h-12 -ml-6 md:-ml-6 bg-gray-800 rounded-full border-4 border-blue-500 flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">EDU</span>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12">
                    <div className="md:text-right">
                      <h3 className="text-xl font-bold text-white">{education[0].degree}</h3>
                      <div className="text-blue-500 mb-2">{education[0].institution} | {education[0].location}</div>
                      <div className="text-sm text-gray-400">{education[0].year}</div>
                      <p className="mt-3 text-gray-300">{education[0].details}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Experience;