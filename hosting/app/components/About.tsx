import React from "react";
import Image from "next/image";

const About = () => {
  const stats = [
    // { value: "4+", label: "Completed Projects" },
    // { value: "4+", label: "Years Experience" },
  ];

  return (
    <section
      id="about"
      className="py-20 relative bg-white text-gray-800 overflow-hidden"
    >
      {/* Dynamic Background Gradient Elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-10 right-0 w-48 h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-20 right-10 w-60 h-60 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-30 blur-2xl"></div>
      {/* New Gradient Element */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-40 blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-left">
          About me
        </h2>

        <div className="flex flex-col md:flex-row">
          {/* Left Column: Biography & Stats */}
          <div className="md:w-2/3 pr-8">
            <div className="mb-8">
              <p className="text-lg max-w-2xl text-left">
                Hi, my name is Joey Russell. I am a student at CBU. As a kid,
                I was always interested in things I did not understand—fascinated
                by MythBusters and eager to create my own gadgets like Batman. I
                soon learned that building these things costs money, so I got a
                job at a machine shop and used that money to build many projects.
                One area that particularly intrigued me, even though I had little
                understanding of it, was penetration testing. I became hooked
                after reading about hacks and scams from around the world; seeing
                how these hackers could operate like ghosts drove me to explore
                this unknown realm. This led me down a dark path: I first learned
                Kali Linux and used Hack The Box to experience the rush of
                infiltrating systems, which pushed me to delve even deeper into
                computer science.
                <br />
                <br />
                Then came a crossroads—whether to enter trades or pursue college.
                I applied to CBU, the only place I applied because I lacked
                confidence. Yet, I soon learned that being humble and not overly
                prideful plays very well in a team setting—a lesson I have
                embraced during my three years at college. I have picked up many
                skills, not only through school, but also by working on projects
                and learning on my own. My personal projects have grown by leaps
                and bounds over time.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-start gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-blue-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Bot */}
          <div className="md:w-1/3">
            <div className="bg-white w-full md:w-96 rounded-xl shadow-lg p-6 space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold">Get to Know me!</h3>
              {/* Chat window */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-64 overflow-y-auto">
                <p className="text-sm text-gray-500">
                  Hi, feel free to ask me any questions about me lol.
                </p>
                {/* Future chat messages will appear here */}
              </div>

              {/* Chat input & Send button */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  className="flex-grow border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
