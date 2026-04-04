import { useParams, Link } from "react-router-dom";
import { openings } from "@/data/openings";
import { useState } from "react";
import { Briefcase, MapPin, Clock, CircleChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function JobDetails() {
  const { id } = useParams();

  const job = openings.find((j) => j.id === id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    motivation: ""
  });

  if (!job) {
    return <div className="text-white p-6">Job not found</div>;
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();

      params.append("job", job.title);
      params.append("firstName", form.firstName);
      params.append("lastName", form.lastName);
      params.append("phone", form.phone);
      params.append("email", form.email);
      params.append("motivation", form.motivation);

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzKNzea1wb42Q7pCpblPg_-FbKGf3E4UUCP9rP1g6FA67IOkw4iwkiwzO2RXq9REQ5VtQ/exec",
        {
          method: "POST",
          body: params
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      toast.success("Application submitted successfully!", {
        style: {
          background: "#16a34a",
          color: "#fff",
          border: "none"
        }
      });

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        motivation: ""
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "#dc2626",
          color: "#fff",
          border: "none"
        }
      });
    }
  };

  return (
    <div className="w-full mx-auto text-white pt-10 mt-10 px-4 sm:px-6 md:px-12 font-medium text-base sm:text-lg md:text-[20px]">

      {/* Back */}
    <Link to="/careers" className="flex items-center text-[#A7A7A7] text-sm sm:text-base md:text-[20px] mb-6 pt-4">
      <CircleChevronLeft className="mr-2"/>
         Back to all positions
      </Link>

      {/* Job Info */}
      <div className="bg-[#1b1b1b] rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] mb-4">
          {job.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-gray-400 mb-6">

          <div className="flex items-center gap-2 text-sm sm:text-base md:text-[20px]">
            <Briefcase size={18} />
            {job.type}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base md:text-[20px]">
            <MapPin size={18} />
            {job.location}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base md:text-[20px]">
            <Clock size={18} />
            {job.posted}
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-[28px] mb-2">
          About the role
        </h3>

        <p className="text-[#B9B9B9] text-sm sm:text-base md:text-[20px]">
          {job.about}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="bg-[#1b1b1b] rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
        <h3 className="text-lg sm:text-xl md:text-[28px] mb-4">
          Key Responsibilities
        </h3>

        <ul className="list-disc ml-5 text-[#B9B9B9] space-y-2 text-sm sm:text-base md:text-[20px]">
          {job.responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Qualifications */}
      <div className="bg-[#1b1b1b] rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
        <h3 className="text-lg sm:text-xl md:text-[28px] mb-4">
          Qualifications
        </h3>

        <ul className="list-disc ml-5 text-[#B9B9B9] space-y-2 text-sm sm:text-base md:text-[20px]">
          {job.qualifications.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div className="bg-[#1b1b1b] rounded-2xl p-4 sm:p-6 md:p-8">
        <h3 className="text-lg sm:text-xl md:text-[28px] mb-4">
          Apply for this Position
        </h3>

        <p className="text-gray-400 text-sm sm:text-base mb-6">
          All fields marked with * are required
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm sm:text-base">First Name *</label>
              <input
              title="firstname"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="text-sm sm:text-base">Last Name *</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="text-sm sm:text-base">Phone Number *</label>
              <input
              title="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base"
                required
              />
            </div>
                
            <div>
              <label className="text-sm sm:text-base">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base"
                required
              />
            </div>

          </div>

          <div>
            <label className="text-sm sm:text-base">
              Why join Slams Edu Tech?
            </label>

            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={5}
              placeholder="Share your motivations..."
              className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-md font-medium mt-4 
            transition-all duration-300 
            hover:-translate-y-1 hover:bg-gray-200 text-sm sm:text-base"
          >
            SUBMIT
          </button>

        </form>
      </div>
    </div>
  );
}