import { useDispatch, useSelector } from "react-redux";
import { RxCheck } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router";

import { editData } from "../../redux/slices/EventForm";
import BasicInformation from "../../components/organizer/BasicInformation";
import Detail from "../../components/organizer/Detail";
import Review from "../../components/organizer/Review";
import { useEffect } from "react";

function EditEvent() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.eventState);
  const { currentStep } = state;
  // const { events, event } = state;

  useEffect(() => {
    (() => {
      dispatch(editData(11))
    })();
  }, [dispatch]);

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
            Edit Event
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${currentStep >= 1 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {currentStep > 1 ? <RxCheck /> : 1}
            </div>
            <div
              className={`w-8 h-0.5 ${currentStep > 1 ? "bg-primary" : "bg-[#E4E4E7]"}`}
            ></div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${currentStep >= 2 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {currentStep > 2 ? <RxCheck /> : 2}
            </div>
            <div
              className={`w-8 h-0.5 ${currentStep > 2 ? "bg-primary" : "bg-[#E4E4E7]"}`}
            ></div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-inter font-semibold text-xs ${currentStep === 3 ? "bg-primary text-white" : "bg-[#E4E4E7] text-secondary"}`}
            >
              {currentStep > 3 ? <RxCheck /> : 3}
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-334.5 px-4 lg:px-77.25 py-8">
        {currentStep === 1 && <BasicInformation />}
        {currentStep === 2 && <Detail />}
        {currentStep === 3 && <Review isEditing />}
      </main>
    </>
  );
}

export default EditEvent;
