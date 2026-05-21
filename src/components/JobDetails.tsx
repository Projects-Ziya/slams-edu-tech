import { useParams, Link } from "react-router-dom";
import { openings } from "@/data/openings";
import { useState } from "react";
import { Briefcase, MapPin, Clock, CircleChevronLeft } from "lucide-react";
import { toast } from "sonner";
import ScrollToTop from "./ScrollToTop";

export default function JobDetails() {
  const { id } = useParams();

  const job = openings.find((j) => j.id === id);

 const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  motivation: "",
  file: null as File | null
});

const [loading, setLoading] = useState(false);

  if (!job) {
    return <div className="text-white p-6">Job not found</div>;
  }
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
  const { name, value } = e.target;

  if (name === "phone") {
    // remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // limit to 10 digits
    if (numericValue.length <= 12) {
      setForm((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    }
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
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
          job: job.title,

          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          motivation: form.motivation,

          fileName: form.file?.name,
          mimeType: form.file?.type,

          file: reader.result
        };

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyCYW_j2YjFXyiw4DQhVaSVKjUp420pFnk_CUe4nuFPEDY3eEIkYDNXrjXKVB7A-A74vA/exec",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();

        console.log(result);

        if (result.success) {

          toast.success("Application submitted successfully!");

          setForm({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            motivation: "",
            file: null
          });

        } else {

          toast.error(result.error || "Upload failed");

        }

      } catch (err) {

        console.log(err);
        toast.error("Submission failed");

      } finally {

        setLoading(false);

      }
    };

    reader.onerror = () => {

      toast.error("File reading failed");
      setLoading(false);

    };

  } catch (err) {

    console.log(err);
    toast.error("Something went wrong");
    setLoading(false);

  }
};

  return (
    <div className="w-full mx-auto text-white pt-10 mt-10 px-4 sm:px-6 md:px-12 font-medium text-base sm:text-lg md:text-[20px]">
      {/* <ScrollToTop /> */}

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

       <form onSubmit={handleSubmit} className="space-y-5">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* FIRST NAME */}
    <div>
      <label className="text-sm sm:text-base">
        First Name *
      </label>

      <input
        type="text"
        name="firstName"
        title="First Name"
        placeholder=""
        value={form.firstName}
        onChange={(e) => {

          const value = e.target.value
            .replace(/[^A-Za-z\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .slice(0, 30);

          setForm((prev) => ({
            ...prev,
            firstName: value
          }));
        }}
        minLength={2}
        maxLength={30}
        autoComplete="given-name"
        required
        className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base outline-none focus:border-white"
      />

      {/* <p className="text-xs text-gray-500 mt-1">
        Alphabets only • Max 30 characters
      </p> */}
    </div>

    {/* LAST NAME */}
    <div>
      <label className="text-sm sm:text-base">
        Last Name *
      </label>

      <input
        type="text"
        name="lastName"
        // placeholder="Enter last name"
        value={form.lastName}
        onChange={(e) => {

          const value = e.target.value
            .replace(/[^A-Za-z\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .slice(0, 30);

          setForm((prev) => ({
            ...prev,
            lastName: value
          }));
        }}
        minLength={1}
        maxLength={30}
        autoComplete="family-name"
        required
        className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base outline-none focus:border-white"
      />

      {/* <p className="text-xs text-gray-500 mt-1">
        Alphabets only • Max 30 characters
      </p> */}
    </div>

    {/* PHONE */}
    <div>
      <label className="text-sm sm:text-base">
        Phone Number *
      </label>

      <input
        type="tel"
        name="phone"
        // placeholder="Enter phone number"
        value={form.phone}
        onChange={(e) => {

          const numericValue = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

          setForm((prev) => ({
            ...prev,
            phone: numericValue
          }));
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
        inputMode="numeric"
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        autoComplete="tel"
        required
        className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Enter valid 10 digit number
      </p>
    </div>

    {/* EMAIL */}
    <div>
      <label className="text-sm sm:text-base">
        Email *
      </label>

      <input
        type="email"
        name="email"
        // placeholder="Enter email address"
        value={form.email}
        onChange={(e) => {

          const value = e.target.value
            .trim()
            .slice(0, 100);

          setForm((prev) => ({
            ...prev,
            email: value
          }));
        }}
        maxLength={100}
        autoComplete="email"
        required
        className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base outline-none focus:border-white"
      />

      <p className="text-xs text-gray-500 mt-1">
        Enter valid email address
      </p>
    </div>

  </div>

  {/* MOTIVATION */}
  <div>

    <label className="text-sm sm:text-base">
      Why join Slams Tech?
    </label>

    <textarea
      name="motivation"
      value={form.motivation}
      onChange={(e) => {

        const value = e.target.value
          .replace(/\s{3,}/g, " ")
          .slice(0, 500);

        setForm((prev) => ({
          ...prev,
          motivation: value
        }));
      }}
      rows={5}
      maxLength={500}
      placeholder="Share your motivations..."
      className="w-full mt-1 bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base outline-none focus:border-white resize-none"
    />

    <div className="flex justify-between mt-1">
      {/* <p className="text-xs text-gray-500">
        Maximum 500 characters
      </p> */}

      <p className="text-xs text-gray-500">
        {form.motivation.length}/500
      </p>
    </div>

  </div>

  {/* FILE UPLOAD */}
  <div>

    <label className="text-sm sm:text-base block mb-2">
      Upload Resume *
    </label>

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

        setForm((prev) => ({
          ...prev,
          file
        }));
      }}
      className="w-full bg-black border border-gray-700 rounded-md p-3 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white file:text-black hover:file:bg-gray-200"
    />

    <p className="text-xs text-gray-500 mt-1">
      Accepted: PDF, DOC, DOCX • Max size: 5MB
    </p>

  </div>

  {/* SUBMIT */}
 <button
  type="submit"
  disabled={loading}
  className="w-full bg-white text-black py-3 rounded-md font-medium mt-4
  transition-all duration-300
  hover:-translate-y-1 hover:bg-gray-200
  disabled:opacity-50 disabled:cursor-not-allowed
  text-sm sm:text-base"
>
  {loading ? "Submitting..." : "SUBMIT"}
</button>

</form>
      </div>
    </div>
  );
}