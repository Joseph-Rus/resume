// app/resume/page.tsx
import Link from 'next/link';
import Layout from '../components/layout';

export default function Resume() {
  return (
    <Layout>
      <div className="py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Resume</h1>
        
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Joey Russell</h2>
              <p className="text-gray-400">Software Developer</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/" className="text-orange-500 hover:text-orange-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Portfolio
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">josephbernard.russell@calbaptist.edu</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-300">(949) 607-9151</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>
              <a href="https://jbrussell.net" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-500 transition">
                jbrussell.net
              </a>
            </div>
          </div>
          
          <div className="mb-8">
            <a 
              href="/resume.pdf" 
              download 
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded inline-flex items-center transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
        
        {/* Education Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Education</h3>
          
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">California Baptist University</h4>
              <span className="text-orange-500">2023 — 2027</span>
            </div>
            <p className="text-lg mb-1">Bachelor of Science in Computer Science</p>
            <p className="text-gray-400 mb-4">GPA: 3.7</p>
          </div>
        </div>
        
        {/* Experience Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Work Experience</h3>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">Audio Visual Technician</h4>
              <span className="text-orange-500">September 2024 — Present</span>
            </div>
            <p className="text-gray-300 mb-2">California Baptist University, Riverside, CA</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Maintain and manage sophisticated audiovisual equipment across campus facilities, ensuring optimal functionality in classrooms, conference rooms, and digital spaces</li>
              <li>Provide technical support and troubleshooting services to faculty and staff, improving technology utilization and minimizing downtime</li>
              <li>Implement preventive maintenance procedures to extend equipment lifespan and reduce technical issues</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">Customer Service Representative</h4>
              <span className="text-orange-500">August 2022 — September 2023</span>
            </div>
            <p className="text-gray-300 mb-2">Uhaul Moving and Storage, Location, CA</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Delivered exceptional customer service by managing complex moving and storage requirements for diverse client needs</li>
              <li>Facilitated seamless customer interactions throughout the entire moving process, maintaining high satisfaction rates</li>
              <li>Developed expertise in logistics coordination and problem-solving while handling multiple customer requests simultaneously</li>
            </ul>
          </div>
          
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">CNC Operator</h4>
              <span className="text-orange-500">September 2021 — August 2022</span>
            </div>
            <p className="text-gray-300 mb-2">RPG Offroad Inc, Location, CA</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Operated advanced CNC machinery to produce high-precision components, maintaining strict quality standards</li>
              <li>Interpreted complex technical blueprints and engineering specifications to ensure accurate production outcomes</li>
              <li>Managed equipment calibration and setup procedures to meet stringent project requirements and quality metrics</li>
            </ul>
          </div>
        </div>
        
        {/* Projects Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Projects</h3>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">SQL Database Server</h4>
              <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">In Progress</span>
            </div>
            <p className="text-gray-300 mb-2">AWS, SQL, Jira</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Designed and deployed a SQL database server on AWS infrastructure</li>
              <li>Implemented secure database management practices and optimized query performance</li>
              <li>Developed efficient data storage and retrieval systems for scalable applications</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">College Study Mate</h4>
              <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">In Progress</span>
            </div>
            <p className="text-gray-300 mb-2">Web Development, Database Design</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Created a comprehensive study platform for college students to collaborate and share resources</li>
              <li>Implemented user authentication, study group management, and resource sharing features</li>
              <li>Developed intuitive interface for managing academic schedules and study materials</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">Formula SAE EV Battery System</h4>
              <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">Completed</span>
            </div>
            <p className="text-gray-300 mb-2">C++, Embedded Systems</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Designed and implemented battery management system (BMS) for Formula SAE electric vehicle</li>
              <li>Developed embedded code for battery monitoring and control systems</li>
              <li>Integrated safety protocols and monitoring systems for battery segments</li>
            </ul>
          </div>
          
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
              <h4 className="text-lg font-medium">FIRST Robotics Competition Projects</h4>
              <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">Completed</span>
            </div>
            <p className="text-gray-300 mb-2">C++, Hardware Integration</p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Led additive manufacturing initiatives for two years, optimizing component production</li>
              <li>Implemented control systems for competition robots using C++ and embedded programming</li>
              <li>Coordinated with team members to develop and execute competitive strategies</li>
            </ul>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Skills</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Technical Skills</h4>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  <span className="text-white">Programming Languages:</span> C++, C, Java, Python, HTML, Node.js
                </li>
                <li>
                  <span className="text-white">Tools & Technologies:</span> AutoCAD, SolidWorks, Linux (Ubuntu, Kali), Excel
                </li>
                <li>
                  <span className="text-white">Cybersecurity:</span> Hack The Box, Kali Linux, Penetration Testing
                </li>
                <li>
                  <span className="text-white">Manufacturing:</span> CNC Operation, Equipment Setup, Engineering Drawings
                </li>
                <li>
                  <span className="text-white">Development:</span> Web Development, Embedded Systems, Computer Science
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Professional Skills</h4>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  <span className="text-white">Industry Knowledge:</span> Information Technology, Computer Technology, E/M Coding
                </li>
                <li>
                  <span className="text-white">Interpersonal:</span> Problem Solving, Communication, Customer Service, Customer Interaction
                </li>
                <li>
                  <span className="text-white">Project Management:</span> Equipment Maintenance, Resource Coordination, Technical Documentation, Jira
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}