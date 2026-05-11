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

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    // FULL NAME
    if (name === "fullName") {

      const cleanedValue = value
        .replace(/[^A-Za-z\s]/g, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);

      setForm((prev) => ({
        ...prev,
        fullName: cleanedValue
      }));

      return;
    }

    // MOBILE
    if (name === "mobile") {

      const cleanedValue = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setForm((prev) => ({
        ...prev,
        mobile: cleanedValue
      }));

      return;
    }

    // EMAIL
    if (name === "email") {

      setForm((prev) => ({
        ...prev,
        email: value.trim().slice(0, 100)
      }));

      return;
    }

    // PROJECT
    if (name === "project") {

      const cleanedValue = value
        .replace(/\s{3,}/g, " ")
        .slice(0, 1000);

      setForm((prev) => ({
        ...prev,
        project: cleanedValue
      }));

      return;
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // EXTRA VALIDATIONS
    if (form.fullName.trim().length < 2) {
      toast.error("Enter valid full name");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (form.project.trim().length < 10) {
      toast.error("Project description is too short");
      return;
    }

    setLoading(true);

    const formData = new URLSearchParams();

    formData.append("fullName", form.fullName.trim());
    formData.append("mobile", form.mobile);
    formData.append("email", form.email.trim());
    formData.append("project", form.project.trim());

    try {

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby0BMXQ4EZo7JPvpfvppaaDftpkzl87I2y-5DSbETH1GYQFqUgNX2B9WoC0b7HdtvO6/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast.success("Submitted successfully ✅");

      // RESET FORM
      setForm({
        fullName: "",
        mobile: "",
        email: "",
        project: ""
      });

    } catch (error) {

      console.error(error);

      toast.error("Something went wrong ❌");

    } finally {

      setLoading(false);

    }
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

          <p className="pt-4 font-bold font-outfit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-tight tracking-tight">
            Start Your Journey <br />
            With{" "}
            <span className="bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)] bg-clip-text text-transparent">
              Slams EduTech
            </span>
          </p>

          <p className="text-gray-400 mt-6 max-w-md text-lg">
            Looking for the best IT company in Kochi? Get in touch with us to grow your business or start your career in technology.
          </p>

          {/* Decorative Lines */}
          <div className="absolute left-[40px] top-[320px] hidden lg:block w-full max-w-[950px] pointer-events-none">

            <svg viewBox="0 0 950 320" className="w-full h-auto mt-6">

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

              <line
                x1="10"
                y1="0"
                x2="10"
                y2="80"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              <line
                x1="10"
                y1="80"
                x2="490"
                y2="80"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              <line
                x1="490"
                y1="80"
                x2="490"
                y2="180"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              <line
                x1="10"
                y1="180"
                x2="490"
                y2="180"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              <line
                x1="10"
                y1="180"
                x2="10"
                y2="270"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              <line
                x1="10"
                y1="270"
                x2="940"
                y2="270"
                stroke="white"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
                markerStart="url(#arrow)"
              />

            </svg>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:pt-[70px] lg:ml-auto lg:max-w-[650px]">

          <form className="space-y-10" onSubmit={handleSubmit}>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              autoComplete="name"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
                autoComplete="tel"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={100}
                autoComplete="email"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition"
              />

            </div>

            <textarea
              name="project"
              rows={5}
              placeholder="Tell us about your project"
              value={form.project}
              onChange={handleChange}
              required
              maxLength={1000}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-4 outline-none focus:border-gray-500 transition resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-300 text-black font-medium py-4 rounded-lg transition-all duration-300 
              hover:-translate-y-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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