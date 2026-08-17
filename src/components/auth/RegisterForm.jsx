import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const termsChecked = watch("terms");
  const navigate = useNavigate();

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
            if (form.confirm !== form.password) {
              setError("confirm", {
                type: "manual",
                message: "Passwords do not match",
              });
              return;
            }
            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some((u) => u.email === form.email)) {
              setError("email", {
                type: "manual",
                message: "Email already exists",
              });
              return;
            }
            console.log(form);

            const { confirm, terms, ...userInfo } = form;
            users.push({ ...userInfo, role: "attendee" })

            localStorage.setItem("users", JSON.stringify(users));
            navigate("/login");
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
              className={`px-3 py-2.5 border-2 rounded-lg ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              id="fullName"
              placeholder="Tatang Sutarman"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs font-inter mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 pb-4">
            <label
              htmlFor="email"
              className="font-inter font-medium text-secondary text-sm"
            >
              Email Address
            </label>
            <input
              className={`px-3 py-2.5 border-2 rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              id="email"
              placeholder="mail@example.com"
              {...register("email", { required: "Email address is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-inter mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 pb-4">
            <label
              htmlFor="pwd"
              className="flex justify-between font-inter font-medium text-secondary text-sm"
            >
              Password
            </label>
            <input
              className={`px-3 py-2.5 border-2 rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              id="pwd"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-inter mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirm"
              className="flex justify-between font-inter font-medium text-secondary text-sm"
            >
              Confirm Password
            </label>
            <input
              className={`px-3 py-2.5 border-2 rounded-lg ${
                errors.confirm ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              id="confirm"
              placeholder="Re-enter your password"
              {...register("confirm", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs font-inter mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>
          <div className="flex gap-2.5 mt-4">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must accept the Terms of Service",
              })}
            />
            <label
              htmlFor="terms"
              className="font-inter font-normal text-xs text-secondary"
            >
              I agree to the{" "}
              <span className="text-primary font-inter font-normal text-xs">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary font-inter font-normal text-xs">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs font-inter mt-1">
              {errors.terms.message}
            </p>
          )}
          <button
            type="submit"
            disabled={!termsChecked}
            className="bg-primary cursor-pointer p-3 rounded-lg w-full text-white font-semibold text-sm font-inter mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
