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

      <div className="w-full px-10 py-10">

        {/* Tabs */}
        <div className="grid grid-cols-2 text-[32px] pb-2 pt-10">
          <button
            onClick={() => setActiveTab("openings")}
            className={`py-6 text-left ${
              activeTab === "openings" ? "border-b border-white" : ""
            }`}
          >
            Currently Opening Positions
          </button>

          <button
            onClick={() => setActiveTab("internships")}
            className={`py-6 text-left ${
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