import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import BasicInformation from "../../components/organizer/BasicInformation";
import Detail from "../../components/organizer/Detail";
import Review from "../../components/organizer/Review";
import { RxCheck } from "react-icons/rx";

function CreateEvent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    tags: [],
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    capacity: 0,
    speakers: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const navigate = useNavigate();
  const cancel = () => {
    navigate("/organizer");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="px-6 py-3 border-b border-b-[#E4E4E7]">
        <div className="lg:max-w-322.5 lg:px-65.25 flex gap-4 items-center">
          <Link
            to="/organizer"
            className="inline-flex text-sm text-secondary hover:text-primary items-center"
          >
            <span className="mr-1.5">
              <IoMdArrowBack />
            </span>{" "}
            Back
          </Link>
          <h1 className="font-jakarta font-semibold text-base leading-6 grow">
            Create Event
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${step >= 1 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {step > 1 ? <RxCheck /> : 1}
            </div>
            <div
              className={`w-8 h-0.5 ${step > 1 ? "bg-primary" : "bg-[#E4E4E7]"}`}
            ></div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${step >= 2 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {step > 2 ? <RxCheck /> : 2}
            </div>
            <div
              className={`w-8 h-0.5 ${step > 2 ? "bg-primary" : "bg-[#E4E4E7]"}`}
            ></div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${step === 3 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {step > 3 ? <RxCheck /> : 3}
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-334.5 px-4 lg:px-77.25 py-8">
        {step === 1 && (
          <BasicInformation
            data={formData}
            setFormData={setFormData}
            onChange={handleInputChange}
            next={nextStep}
            prev={cancel}
          />
        )}
        {step === 2 && (
          <Detail
            data={formData}
            onChange={handleInputChange}
            setFormData={setFormData}
            next={nextStep}
            prev={prevStep}
          />
        )}
        {step === 3 && (
          <Review
            data={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            prev={prevStep}
          />
        )}
      </main>
    </>
  );
}

export default CreateEvent;
