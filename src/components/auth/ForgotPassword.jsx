import { useForm } from "react-hook-form";
import { RxCheck } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { sendResetLink } from "../../redux/slices/LoginSlice";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.activeState);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendLink = async (form) => {
    try {
      await dispatch(sendResetLink(form.email)).unwrap()

      setTimeout(() => {
        state.resetSent = false
        state.sentTo = null
        navigate("/login")
      }, 3000);
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

  return (
    <>
      {state.resetSent ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-[#33B5701A] w-16 h-16 rounded-full flex justify-center items-center">
              <RxCheck strokeWidth={1} className="w-8 h-8 text-[#33B570]" />
            </div>
            <p className="pt-4 font-jakarta font-bold text-2xl text-[#18181B] leading-8">
              Check Your Email
            </p>
            <p className="pt-2 pb-6 font-inter font-normal text-sm text-secondary leading-5">
              We sent a reset link to{" "}
              <span className="font-bold text-black">
                {state.sentTo || "mail@example.com"}
              </span>
            </p>
            <div className="flex gap-2 justify-center items-center pt-2">
              <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              <p className="font-inter font-normal text-primary text-sm leading-5">Back to sign in</p>
            </div>
          </div>
        </div>
      ) : (
        <section>
          <h2 className="font-jakarta font-bold text-2xl">
            Reset your password
          </h2>
          <p className="font-inter font-normal text-sm mt-1">
            Enter your email and we'll send a link.
          </p>
          <div className="pt-5">
            <form
              onSubmit={handleSubmit(handleSendLink)}
            >
              <div className="flex flex-col gap-1 pb-4">
                <label
                  htmlFor="email"
                  className="font-inter font-medium text-secondary text-sm"
                >
                  Email Address
                </label>
                <input
                  className="px-3 py-2.5 border-2 border-gray-300 rounded-lg"
                  type="email"
                  id="email"
                  placeholder="mail@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              {errors?.pwd && (
                <p className="text-red-500">{errors.pwd.message}</p>
              )}
              <button
                type="submit"
                className="bg-primary cursor-pointer p-3 rounded-lg w-full text-white font-semibold text-sm font-inter"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default ForgotPassword;
