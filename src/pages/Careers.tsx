import { useState, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import OpeningPositions from "../components/OpeningPositions";
import Internships from "../components/Internships";

export default function Careers() {
  const [activeTab, setActiveTab] = useState<"openings" | "internships">(
    "openings"
  );

  useEffect(() => {
    if (window.location.hash === "#internships") {
      setActiveTab("internships");
    }
  }, []);

  return (
    <div className="bg-black text-white flex justify-center">
      <ScrollToTop />

      <div className="w-full px-4  sm:px-6 md:px-8 lg:px-10 pt-10 sm:py-9 md:py-10 ">

        {/* Tabs */}
        <div className="grid grid-cols-2 text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] pb-2 pt-6 sm:pt-8 md:pt-10">
          <button
            onClick={() => setActiveTab("openings")}
            className={`py-4 sm:py-5 md:py-6 text-left ${
              activeTab === "openings" ? "border-b border-white" : ""
            }`}
          >
            Currently Opening Positions
          </button>

          <button
            onClick={() => setActiveTab("internships")}
            className={`py-4 sm:py-5 md:py-6 text-left ${
              activeTab === "internships" ? "border-b border-white" : ""
            }`}
          >
            Internships
          </button>
        </div>

        {/* Dynamic Component */}
        {activeTab === "openings" && <OpeningPositions />}
        {activeTab === "internships" && <Internships />}

      </div>
    </div>
  );
}