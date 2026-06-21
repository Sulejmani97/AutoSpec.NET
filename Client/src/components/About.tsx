import tools from "../images/tools.jpg";
import { BsTools } from "react-icons/bs";
import { FaChartColumn } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";

export default function About() {
  const features = [
    {
      title: "Maintenance Tracking",
      description:
        "Keep detailed records of all vehicle maintenance and repairs",
      icon: <BsTools className="text-gray-800" />,
    },
    {
      title: "Mileage Tracking",
      description: "Monitor travel history with ease",
      icon: <FaChartColumn />,
    },
    {
      title: "Extensive Make & Model Database",
      description: "Support for thousands of makes and models worldwide",
      icon: <FaCarSide className="text-primary" />,
    },
  ];

  return (
    <>
      <div
        id="aboutSection"
        className="flex flex-col items-center justify-center container mx-auto w-full p-14 font-rubik"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            About
            <span className="underline underline-offset-4 decoration-2 font-light">
              {" "}
              Auto
              <span className="text-primary">Spec</span>
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Innovative automotive tools for everyone.
          </p>
        </div>

        {/* Main intro section */}
        <div className="flex flex-row gap-16 items-center mb-20 max-lg:flex-col">
          <img
            src={tools}
            className="rounded-lg w-96 object-cover shadow-lg max-lg:w-full"
          />
          <div className="text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              Auto<span className="text-primary font-semibold">Spec</span> is
              your go-to resource for all things related to vehicle maintenance
              and management. Whether you're a professional mechanic or a car
              enthusiast, our platform is designed to help you stay on top of
              your vehicle's needs.
            </p>
            <p className="text-lg leading-relaxed">
              With our comprehensive tools, you can easily track your vehicle's
              maintenance history, monitor mileage and fuel efficiency, and
              manage your automotive expenses efficiently. Maintaining your
              vehicle has never been easier or more organized.
            </p>
          </div>
        </div>

        {/* Features section */}
        <div className="w-full mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator section */}
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Created by</h3>
          <p className="text-xl text-primary font-semibold">Destin Sulejmani</p>
          <p className="text-gray-600 mt-2">
            Dedicated to making vehicle management simple and accessible for
            everyone.
          </p>
        </div>
      </div>
    </>
  );
}
