//https://docs.google.com/spreadsheets/d/1JxvUZXA5hfojOhIwDHTTXUy3avQ9OpsAdyXmyhwARJI/edit?usp=sharing


import { useParams, Link } from "react-router-dom";
import { openings } from "@/data/openings";
import { useState } from "react";
import { Briefcase, MapPin, Clock,CircleChevronLeft} from "lucide-react";
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
    return <div className="text-white p-10">Job not found</div>;
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
    <div className="w-full mx-auto text-white pt-16 px-12 font-medium text-[20px]">

      <Link to="/careers" className="text-[#A7A7A7] text-[20px] font-medium mb-6 pt-6 inline-block">
      <CircleChevronLeft className="mr-2"/>
         Back to all positions
      </Link>

      <div className="bg-[#1b1b1b] rounded-2xl p-8 mb-8">
        <h1 className="text-[40px] font-medium mb-4">{job.title}</h1>

        <div className="flex gap-6 text-gray-400 text-sm mb-6">
          <div className="flex items-center font-medium text-[24px] gap-2">
            <Briefcase size={20} />
            {job.type}
          </div>

          <div className="flex items-center font-medium text-[24px] gap-2">
            <MapPin size={20} />
            {job.location}
          </div>

          <div className="flex items-center font-medium text-[24px] gap-2">
            <Clock size={20} />
            {job.posted}
          </div>
        </div>

        <h3 className="text-[32px] font-medium mb-2">About the role</h3>
        <p className="text-[#B9B9B9] font-medium text-[24px]">{job.about}</p>
      </div>

      <div className="bg-[#1b1b1b] rounded-2xl p-8 mb-8">
        <h3 className="text-[32px] font-medium mb-4">Key Responsibilities</h3>

        <ul className="list-disc ml-6 text-[#B9B9B9] space-y-2 text-[24px]">
          {job.responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-[#1b1b1b] rounded-2xl p-8 mb-8">
        <h3 className="text-[32px] font-medium mb-4">Qualifications</h3>

        <ul className="list-disc ml-6 text-[#B9B9B9] space-y-2 text-[24px]">
          {job.qualifications.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-[#1b1b1b] rounded-2xl p-8">
        <h3 className="text-[32px] font-medium mb-4">Apply for this Position</h3>

        <p className="text-gray-400 text-[24px] mb-6">
          All fields marked with * are required
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-[24px]">First Name *</label>
              <input
              title="firstname"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3"
                required
              />
            </div>

            <div>
              <label className="text-[24px]">Last Name *</label>
              <input
              title="lastname"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3"
                required
              />
            </div>

            <div>
              <label className="text-[24px]">Phone Number *</label>
              <input
              title="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3"
                required
              />
            </div>

            <div>
              <label className="text-[24px]">Email *</label>
              <input
              title="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3"
                required
              />
            </div>

          </div>

          <div>
            <label className="text-[24px]">Why join Slams Edu Tech?</label>

            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={5}
              placeholder="share your motivations..."
              className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3"
            />
          </div>

         <button
  type="submit"
  className="w-full bg-white text-black py-3 rounded-md font-medium mt-4 
  transition-all duration-300 
  hover:-translate-y-1 hover:bg-gray-200"
>
  SUBMIT
</button>

        </form>
      </div>
    </div>
  );
}