import React from "react";
import { useLocation, Link } from "react-router-dom";

const LaunchPadDetails = () => {
  const location = useLocation();
  const { bg, logo, title, desc } = location.state || {};

  if (!title)
    return (
      <div className="text-center mt-20 text-2xl font-semibold">
        No data found!
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-12">
      <div className="bg-white rounded-[34px] shadow-2xl max-w-6xl w-full min-h-[433px] flex flex-col md:flex-row overflow-hidden">
        {/* Left side: text content with animation */}
        <div className="flex-1 p-10 flex flex-col justify-between animate-fadeUp">
          <div>
            <div className="flex items-center mb-6 gap-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C357E] tracking-tight flex-1">
                {title}
              </h1>
              {logo && (
                <div className="w-20 h-20 flex-shrink-0 rounded-lg shadow-lg overflow-hidden border border-gray-300">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <ul className="text-gray-900 text-lg md:text-xl pl-5 list-disc space-y-4 mb-2 text-left">
              {Array.isArray(desc)
                ? desc.map((point, i) => <li key={i}>{point}</li>)
                : <li>{desc}</li>}
            </ul>
          </div>

          <div className="flex justify-end pt-8">
            <Link
              to="/launchpad"
              className="px-7 py-3 rounded-xl bg-[#255DB0] text-white font-semibold hover:bg-[#133562] transition"
            >
              Back to LaunchPad
            </Link>
          </div>
        </div>

        {/* Right side: background image */}
        {bg && (
          <div
            className="flex-1 min-h-[300px] md:min-h-auto"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp {
            animation: fadeUp 1s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LaunchPadDetails;
