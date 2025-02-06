
import { Building2 } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600">
            We're looking for passionate individuals to help shape the future of real estate
          </p>
        </div>

        <div className="mb-16">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Team working together"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-primary/10 rounded">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Flexible Work Environment</h3>
                  <p className="text-gray-600">Work from anywhere in the world with our remote-first culture.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-primary/10 rounded">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Competitive Benefits</h3>
                  <p className="text-gray-600">Comprehensive health insurance, retirement plans, and more.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-primary/10 rounded">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Growth Opportunities</h3>
                  <p className="text-gray-600">Continuous learning and career development support.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{job.department}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
