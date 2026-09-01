import { useParams } from "react-router-dom";
import { internship } from "@/data/internship";
import { useNavigate } from "react-router-dom";
import { Clock, CircleCheck, Users, ChevronLeft } from "lucide-react";
import ScrollToTop from "./ScrollToTop";
import SEO from "./SEO";
import { useState } from "react";
import { toast } from "sonner";
import { motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 34 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
};

const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export default function InternshipDetails() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    file: null as File | null
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      e.target.value = "";
      return;
    }

    setForm({ ...form, file });
  };

  const handleChange = (e: any) => {
    const { placeholder, value } = e.target;

    if (placeholder.includes("First")) setForm({ ...form, firstName: value });
    else if (placeholder.includes("Last")) setForm({ ...form, lastName: value });
    else if (placeholder.includes("Phone")) setForm({ ...form, phone: value });
    else if (placeholder.includes("Email")) setForm({ ...form, email: value });
    else setForm({ ...form, message: value });
  };

 const handleSubmit = async (e: any) => {

  e.preventDefault();

  if (!form.file) {
    toast.error("Please upload resume");
    return;
  }

  setLoading(true);

  try {

    const reader = new FileReader();

    reader.readAsDataURL(form.file);

    reader.onload = async () => {

      try {

        const payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          message: form.message,

          fileName: form.file?.name,
          mimeType: form.file?.type,

          file: reader.result
        };

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwqoX_sD6uzaf3nFNXTzzYzfdWG7dqlANgBn20Ww69Y92RQWRk0c2btnViifJtWtAGx/exec",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();

        console.log(result);

        if (result.success) {

          toast.success("Application submitted ✅");

          setForm({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
            file: null
          });

        } else {

          toast.error(result.error || "Upload failed");

        }

      } catch (err) {

        console.log(err);
        toast.error("Submission failed ❌");

      } finally {

        setLoading(false);

      }
    };

  } catch (err) {

    console.log(err);
    toast.error("Something went wrong ❌");
    setLoading(false);

  }
};

  const { id } = useParams();
  const data = internship.find((item) => item.id === id);
  const navigate = useNavigate();

  if (!data) return <><SEO title="Internship not found | Slams Tech" description="The requested internship could not be found." noindex /><div className="text-white p-6">Internship not found</div></>;

  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1780px] mx-auto text-white font-outfit px-4 sm:px-6 md:px-12 pt-10 pb-16">


      <SEO title={`${data.title} Internship | Slams Tech`} description={data.description} keywords={`${data.title} internship, Slams Tech internship`} image={data.image} />
      <ScrollToTop />

      <div className="">
        
      </div>

      {/* HERO */}
      <div className="mt-20 md:mt-0 lg:mt-0 xl:mt-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        <motion.div
          className="space-y-5 sm:space-y-6"
          variants={staggerGroup}
          initial="hidden"
          animate="visible"
        >

          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#A7A7A7] text-sm sm:text-base md:text-[18px] 3xl:text-[22px] mb-6 "
            variants={fadeUp}
          >
            <ChevronLeft className="3xl:w-6 3xl:h-6" />
            Back to all Programs
          </motion.button>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold leading-tight tracking-tight text-white"
            variants={fadeUp}
          >
            {data.title}
          </motion.h1>

          <motion.p
            className="text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-light leading-relaxed tracking-wide"
            variants={fadeUp}
          >
            {data.description}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
            <button className="bg-[#2F2F2F] flex items-center gap-2 text-xs sm:text-sm 3xl:text-base px-3 py-2 3xl:px-4 3xl:py-2.5 rounded-lg">
              <Clock className="text-blue-400 3xl:w-5 3xl:h-5" size={18} />
              6 Months
            </button>

            <button className="bg-[#2F2F2F] flex items-center gap-2 text-xs sm:text-sm 3xl:text-base px-3 py-2 3xl:px-4 3xl:py-2.5 rounded-lg">
              <Users className="text-blue-400 3xl:w-5 3xl:h-5" size={18} />
              Hybrid/Remote
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center gap-6 sm:gap-8 text-gray-400 pt-4"
            variants={fadeUp}
          >

            <div>
              <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[30px] font-bold leading-tight">500+</p>
              <span className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px]">Students Trained</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[30px] font-bold leading-tight">95%</p>
              <span className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px]">Success Rate</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[30px] font-bold leading-tight">4.9/5</p>
              <span className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px]">Student Rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className="w-full max-w-[700px] 3xl:max-w-[850px] h-[250px] sm:h-[320px] md:h-[550px] 3xl:h-[650px] 4xl:h-[750px] md:pt-24 mx-auto"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <clipPath id="customClip2" clipPathUnits="objectBoundingBox">
                <path d="M 0.14 0 L 0.69 0 Q 0.7 0 0.705 0.01 L 0.78 0.11 Q 0.785 0.11 0.79 0.11 L 1 0.11 L 1 0.83 Q 1 0.835 0.995 0.84 L 0.88 1 L 0 1 L 0 0.18 Q 0 0.175 0.01 0.17 L 0.14 0 Z" />
              </clipPath>
            </defs>

            <image
              href={data.image}
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#customClip2)"
            />

            <path
              d="M 0.14 0 L 0.69 0 Q 0.7 0 0.705 0.01 L 0.78 0.11 Q 0.785 0.11 0.79 0.11 L 1 0.11 L 1 0.83 Q 1 0.835 0.995 0.84 L 0.88 1 L 0 1 L 0 0.18 Q 0 0.175 0.01 0.17 L 0.14 0 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.0018"
            />
          </svg>
        </motion.div>
      </div>

      {/* DURATION */}
      <motion.div
        className="mx-auto space-y-6 sm:space-y-8 pt-3 mt-8 3xl:mt-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        <div>
          <p className="text-2xl md:text-3xl xl:text-4xl 3xl:text-5xl font-bold leading-tight tracking-tight text-white">
            Internship Duration
          </p>
          <p className="pt-2 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-light leading-relaxed tracking-wide">
            Choose a timeline that fits your schedule • Flexible timings
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 3xl:gap-8"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {data.duration.map((item, i) => (
            <motion.div key={i} className="border border-gray-700 p-4 sm:p-6 3xl:p-8 rounded-xl space-y-3 sm:space-y-4 3xl:space-y-5" variants={cardReveal}>
              <Clock className="text-blue-400 w-6 h-6 3xl:w-8 3xl:h-8" />

              <p className="font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[28px] leading-tight">{item.title}</p>

              <p className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px] text-gray-300 leading-relaxed">
                {data.carddetail[i]}
              </p>

              <ul className="space-y-2 3xl:space-y-3">
                {item.points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px] text-gray-300">
                    <CircleCheck className="text-blue-400 mt-1" size={16} />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* LEARN */}
      <motion.div
        className="mx-auto space-y-6 mt-8 3xl:mt-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl xl:text-4xl 3xl:text-5xl font-bold leading-tight tracking-tight text-white pt-3">
          What You'll Learn
        </h2>

        <motion.div
          className="border border-gray-700 rounded-xl p-5 sm:p-8 3xl:p-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 3xl:gap-10"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {data.learn.map((item, i) => (
            <motion.div key={i} className="flex gap-3 font-medium text-[14px] md:text-[16px] lg:text-[18px] 3xl:text-[20px] text-gray-300 leading-relaxed" variants={cardReveal}>
              <CircleCheck className="text-blue-400 mt-1 w-5 h-5 3xl:w-6 3xl:h-6 flex-shrink-0" />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* BENEFITS */}
      <motion.div
        className="mx-auto space-y-6 mt-8 3xl:mt-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl xl:text-4xl 3xl:text-5xl font-bold leading-tight tracking-tight text-white pt-3">
          What You'll Get
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 3xl:gap-8"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {data.benefits.map((item, i) => {
            const Icon = item.img;
            return (
              <motion.div key={i} className="border border-gray-700 p-5 sm:p-6 3xl:p-8 rounded-xl space-y-3 sm:space-y-4 3xl:space-y-5" variants={cardReveal}>
                <div className="bg-gray-900 w-10 h-10 3xl:w-14 3xl:h-14 flex items-center justify-center rounded-md">
                  <Icon className="w-5 h-5 3xl:w-7 3xl:h-7 text-blue-500" />
                </div>
                <h3 className="font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[28px] leading-tight">{item.title}</h3>
                <p className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px] text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

       {/* FORM */}
      <motion.div
        className="max-w-[1900px] mx-auto border border-[#7C7C7C] rounded-xl p-5 sm:p-8 3xl:p-12 space-y-5 mt-12 3xl:mt-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
      >

        <p className="text-2xl md:text-3xl xl:text-4xl 3xl:text-5xl font-bold leading-tight tracking-tight text-white">
          Apply for this Internship
        </p>

       <form className="space-y-5" onSubmit={handleSubmit}>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* FIRST NAME */}
    <div>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        placeholder="First Name*"
        required
        minLength={2}
        maxLength={30}
        autoComplete="given-name"
        onChange={(e) => {

          const value = e.target.value
            .replace(/[^A-Za-z\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .slice(0, 30);

          setForm({
            ...form,
            firstName: value
          });
        }}
        className="w-full bg-black border border-gray-500 p-3 rounded-xl outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Alphabets only • Max 30 characters
      </p>
    </div>

    {/* LAST NAME */}
    <div>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        placeholder="Last Name*"
        required
        minLength={1}
        maxLength={30}
        autoComplete="family-name"
        onChange={(e) => {

          const value = e.target.value
            .replace(/[^A-Za-z\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .slice(0, 30);

          setForm({
            ...form,
            lastName: value
          });
        }}
        className="w-full bg-black border border-gray-500 p-3 rounded-xl outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Alphabets only • Max 30 characters
      </p>
    </div>

    {/* PHONE */}
    <div>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        placeholder="Phone*"
        required
        inputMode="numeric"
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        autoComplete="tel"
        onChange={(e) => {

          const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

          setForm({
            ...form,
            phone: value
          });
        }}
        onPaste={(e) => {

          const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "");

          if (pasted.length > 10) {

            e.preventDefault();

            toast.error("Phone number must be 10 digits");
          }
        }}
        className="w-full bg-black border border-gray-500 p-3 rounded-xl outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Enter valid 10 digit number
      </p>
    </div>

    {/* EMAIL */}
    <div>
      <input
        type="email"
        name="email"
        value={form.email}
        placeholder="Email*"
        required
        maxLength={100}
        autoComplete="email"
        onChange={(e) => {

          const value = e.target.value
            .trim()
            .slice(0, 100);

          setForm({
            ...form,
            email: value
          });
        }}
        className="w-full bg-black border border-gray-500 p-3 rounded-xl outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Enter valid email address
      </p>
    </div>

  </div>

  {/* MESSAGE */}
  <div>

    <textarea
      value={form.message}
      name="message"
      rows={5}
      maxLength={500}
      placeholder="Message"
      onChange={(e) => {

        const value = e.target.value
          .replace(/\s{3,}/g, " ")
          .slice(0, 500);

        setForm({
          ...form,
          message: value
        });
      }}
      className="w-full bg-black border border-gray-500 p-3 rounded-xl outline-none focus:border-white resize-none"
    />

    <div className="flex justify-between mt-1">

      <p className="text-xs text-gray-500">
        Maximum 500 characters
      </p>

      <p className="text-xs text-gray-500">
        {form.message.length}/500
      </p>

    </div>

  </div>

  {/* FILE */}
  <div>

    <input
      type="file"
      accept=".pdf,.doc,.docx"
      required
      onChange={(e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {

          toast.error("Only PDF, DOC, DOCX files allowed");

          e.target.value = "";

          return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

          toast.error("File size must be less than 5MB");

          e.target.value = "";

          return;
        }

        setForm({
          ...form,
          file
        });
      }}
      className="w-full bg-black border border-gray-500 p-3 rounded-xl text-sm
      file:mr-4
      file:py-2
      file:px-4
      file:border-0
      file:bg-white
      file:text-black
      hover:file:bg-gray-200"
    />

    <p className="text-xs text-gray-500 mt-1">
      Accepted: PDF, DOC, DOCX • Max 5MB
    </p>

  </div>

  {/* BUTTON */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-white text-black text-base md:text-lg 3xl:text-xl font-semibold tracking-wide py-3 3xl:py-4 rounded
    hover:bg-gray-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition-all duration-300"
  >
    {loading ? "Submitting..." : "SUBMIT"}
  </button>

</form>
      </motion.div>
    </div>
  );
}
