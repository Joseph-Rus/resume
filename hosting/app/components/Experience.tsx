import React from "react";

const Experience = () => {
  const experiences = [
    {
      year: "2024",
      role: "Audio Visual Technician",
      company: "California Baptist University",
      location: "Riverside, CA",
      description:
        "Maintain and manage sophisticated audiovisual equipment across campus facilities. Provide technical support and troubleshooting services to faculty and staff. Implement preventive maintenance procedures to extend equipment lifespan.",
      current: true,
    },
    {
      year: "2022-2023",
      role: "Customer Service Representative",
      company: "Uhaul Moving and Storage",
      location: "Location, CA",
      description:
        "Delivered exceptional customer service by managing complex moving and storage requirements. Facilitated seamless customer interactions throughout the entire moving process. Developed expertise in logistics coordination and problem-solving.",
      current: false,
    },
    {
      year: "2021-2022",
      role: "CNC Operator",
      company: "RPG Offroad Inc",
      location: "Location, CA",
      description:
        "Operated advanced CNC machinery to produce high-precision components. Interpreted complex technical blueprints and engineering specifications. Managed equipment calibration and setup procedures.",
      current: false,
    },
  ];

  const education = [
    {
      year: "2023-2027",
      degree: "Bachelor of Science in Computer Science",
      institution: "California Baptist University",
      location: "Riverside, CA",
      details: "GPA: 3.7",
      current: true,
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Experience
        </h2>

        <div className="relative">
          {/* Centered Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-orange-500 rounded-full w-12 h-12 flex items-center justify-center shadow">
                    <span className="text-orange-500 font-bold text-sm">
                      {exp.year.split("-")[0]}
                    </span>
                  </div>

                  {/* Experience Content */}
                  <div
                    className={`mt-8 md:mt-0 md:w-1/2 px-4 ${
                      isEven
                        ? "md:pr-8 md:text-right"
                        : "md:pl-8 md:text-left"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.role}
                    </h3>
                    <div className="text-orange-500 mb-2">
                      {exp.company} | {exp.location}
                    </div>
                    <div className="text-sm text-gray-600">{exp.year}</div>
                    <p className="mt-3 text-gray-500">{exp.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Education */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow">
                <span className="text-blue-500 font-bold text-sm">EDU</span>
              </div>

              {/* Education Content */}
              <div className="mt-8 md:mt-0 md:w-1/2 px-4 md:pr-8 md:text-right">
                <h3 className="text-xl font-bold text-gray-900">
                  {education[0].degree}
                </h3>
                <div className="text-blue-500 mb-2">
                  {education[0].institution} | {education[0].location}
                </div>
                <div className="text-sm text-gray-600">{education[0].year}</div>
                <p className="mt-3 text-gray-500">{education[0].details}</p>
              </div>
              <div className="hidden md:block md:w-1/2 md:pl-8"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
