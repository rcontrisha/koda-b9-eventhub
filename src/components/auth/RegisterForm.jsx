import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { FaGoogle, FaGithub } from "react-icons/fa";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <section>
      <h2 className="font-jakarta font-bold text-2xl">Create your account</h2>
      <p className="font-inter font-normal text-sm mt-1">
        Already have an account?{" "}
        <span className="font-inter font-medium text-sm text-primary">
          Sign In
        </span>
      </p>
      <div className="flex gap-2 pt-7">
        <div className="grow flex gap-1 justify-center items-center py-2 border-2 border-gray-300 rounded-lg font-inter font-medium text-sm text-secondary cursor-pointer">
          <FaGoogle />
          <div>Google</div>
        </div>
        <div className="grow flex gap-1 justify-center items-center py-2 border-2 border-gray-300 rounded-lg font-inter font-medium text-sm text-secondary cursor-pointer">
          <FaGithub />
          <div>GitHub</div>
        </div>
      </div>
      <div className="pt-5">
        <Divider className="px-3 text-secondary">
          or continue with email
        </Divider>
      </div>
      <div className="pt-5">
        <form
          onSubmit={handleSubmit((form) => {
            console.log(form);
          })}
        >
          <div className="flex flex-col gap-1 pb-4">
            <label
              htmlFor="fullName"
              className="font-inter font-medium text-secondary text-sm"
            >
              Full Name
            </label>
            <input
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg"
              type="text"
              id="fullName"
              placeholder="Tatang Sutarman"
              {...register("fullName", { required: true })}
            />
          </div>
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
          <div className="flex flex-col gap-1 pb-4">
            <label
              htmlFor="pwd"
              className="flex justify-between font-inter font-medium text-secondary text-sm"
            >
              Password
            </label>
            <input
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg"
              type="password"
              id="pwd"
              placeholder="At least 8 characters"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirm"
              className="flex justify-between font-inter font-medium text-secondary text-sm"
            >
              Confirm Password
            </label>
            <input
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg"
              type="password"
              id="confirm"
              placeholder="Re-enter your password"
              {...register("confirm", { required: true })}
            />
          </div>
          <div className="flex gap-2.5 mt-4">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="font-inter font-normal text-xs text-secondary">I agree to the <span className="text-primary font-inter font-normal text-xs">Terms of Service</span> and <span className="text-primary font-inter font-normal text-xs">Privacy Policy</span></label>
          </div>
          {errors?.pwd && <p className="text-red-500">{errors.pwd.message}</p>}
          <button
            type="submit"
            className="bg-primary cursor-pointer p-3 rounded-lg w-full text-white font-semibold text-sm font-inter mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
