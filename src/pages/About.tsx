
import { Heart, Users, Building } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About LovenSunrise</h1>
          <p className="text-lg text-gray-600">
            Transforming the way people find and manage properties
          </p>
        </div>

        <div className="mb-16">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
            alt="Beautiful landscape"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2024, LovenSunrise emerged from a simple idea: make property
              hunting and management accessible to everyone. We believe in creating a
              platform that brings together tenants, landlords, and real estate
              professionals in a seamless, transparent ecosystem.
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600">To make property management and rental experiences delightful for everyone.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Our Team</h3>
                <p className="text-gray-600">A diverse group of experts passionate about revolutionizing real estate.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Our Values</h3>
                <p className="text-gray-600">Transparency, innovation, and customer satisfaction guide everything we do.</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6">
              We envision a future where finding and managing properties is as simple as
              a few clicks. Through innovative technology and exceptional service, we're
              making this vision a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
