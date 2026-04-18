import React, { useState } from "react";
import { toast } from "sonner";

const ContactSection: React.FC = () => {

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    project: ""
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.placeholder.includes("Full Name") ? "fullName" :
       e.target.placeholder.includes("Mobile") ? "mobile" :
       e.target.placeholder.includes("Email") ? "email" : "project"]: e.target.value
    });
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("fullName", form.fullName);
    formData.append("mobile", form.mobile);
    formData.append("email", form.email);
    formData.append("project", form.project);

    try {
      await fetch("https://script.google.com/macros/s/AKfycby0BMXQ4EZo7JPvpfvppaaDftpkzl87I2y-5DSbETH1GYQFqUgNX2B9WoC0b7HdtvO6/exec", {
        method: "POST",
        body: formData,
      });

      toast.success("Submitted successfully ✅");

      // reset form
      setForm({
        fullName: "",
        mobile: "",
        email: "",
        project: ""
      });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <section
  id="contact"
  className="relative overflow-hidden w-full min-h-[700px] bg-[#05050b] text-white py-10 px-4 md:px-10"
>

  {/* 🔵 BLUE RING BACKGROUND */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">

    {/* MAIN RING */}
    <div className="w-full h-[900px] opacity-50 
      bg-[radial-gradient(circle,_transparent_45%,_rgba(59,130,246,0.25)_55%,_transparent_80%)]" />

    {/* SOFT INNER GLOW */}
    <div className="absolute w-[700px] h-[700px] opacity-40 
      bg-[radial-gradient(circle,_rgba(59,130,246,0.15)_0%,_transparent_90%)]" />

  </div>

  {/* CONTENT */}
  <div className="relative z-10 w-full grid lg:grid-cols-2 gap-16 items-start">

    {/* LEFT CONTENT */}
    <div className="relative lg:pl-4 pt-10">
      <p className="text-[#BFBFBF] text-[24px] font-medium pb-6">
        / Get In Touch
      </p>

      <p className="pt-5 font-extrabold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
        Start Your Journey <br />
        With <span className="text-blue-500">Slams EduTech</span>
      </p>

      <p className="text-gray-400 mt-6 max-w-md text-lg">
Looking for the best IT company in Kochi? Get in touch with us to grow your business or start your career in technology.      </p>

      {/* Decorative Lines */}
      <div className="absolute left-[40px] top-[320px] hidden lg:block w-full max-w-[950px] pointer-events-none">
  <svg viewBox="0 0 950 320" className="w-full h-auto">

    {/* ✅ Arrow Definition */}
    <defs>
      <marker
        id="arrow"
        markerWidth="8"
        markerHeight="8"
        refX="4"
        refY="4"
        orient="auto"
      >
        <path d="M0,0 L8,4 L0,8 Z" fill="white" />
      </marker>
    </defs>

    {/* ✅ Lines with arrows */}
    <line x1="10" y1="0" x2="10" y2="80"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />

    <line x1="10" y1="80" x2="490" y2="80"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />

    <line x1="490" y1="80" x2="490" y2="180"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />

    <line x1="10" y1="180" x2="490" y2="180"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />

    <line x1="10" y1="180" x2="10" y2="270"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />

    <line x1="10" y1="270" x2="940" y2="270"
      stroke="white" strokeWidth="1.5"
      markerEnd="url(#arrow)"
      markerStart="url(#arrow)"  // 👈 both sides arrow
    />

  </svg>
</div>
    </div>

    {/* RIGHT FORM */}
    <div className="w-full md:pt-[70px] lg:ml-auto lg:max-w-[650px]">
      <form className="space-y-10" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
          />
        </div>

        <textarea
          rows={5}
          placeholder="Tell us about your project"
          value={form.project}
          onChange={handleChange}
          required
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-300 text-black font-medium py-4 rounded-lg transition-all duration-300 
          hover:-translate-y-1 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>

  </div>
</section>
  );
};

export default ContactSection;