// components/About.tsx
import Image from 'next/image';

const About = () => {
  const services = [
    {
      icon: "🖥️",
      title: "Website Development",
      description: "Building responsive, modern websites using the latest technologies."
    },
    {
      icon: "📱",
      title: "App Development",
      description: "Creating mobile and desktop applications with clean, efficient code."
    },
    {
      icon: "🌐",
      title: "Website Hosting",
      description: "Setting up and maintaining secure hosting environments for web applications."
    }
  ];

  const stats = [
    { value: "4+", label: "Completed Projects" },
    { value: "95%", label: "Client satisfaction" },
    { value: "4+", label: "Years experience" }
  ];

  return (
    <section id="about" className="py-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">About me</h2>
      
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center">
            I started my software journey from photography. Through that, I learned to love the process of creating from scratch. 
            Since then, this has led me to software development as it fulfills my love for learning and building things.
            Currently pursuing a Bachelor's degree in Computer Science at California Baptist University.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">
                {stat.value} <span className="text-orange-500">+</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border-l border-orange-500">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;