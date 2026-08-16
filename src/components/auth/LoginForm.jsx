import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const { login } = useAuth();

  return (
    <section>
      <h2 className="font-jakarta font-bold text-2xl">Welcome back</h2>
      <p className="font-inter font-normal text-sm mt-1">
        Don't have an account?{" "}
        <span className="font-inter font-medium text-sm text-primary">
          Sign Up
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

            const users = JSON.parse(localStorage.getItem("users") || "[]");
            for (const user of users) {
              if (user.email === form.email && user.password === form.password) {
                login(form.email);
                navigate("/explore");
              }
            }
          })}
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
          <div className="flex flex-col gap-1 pb-4">
            <label
              htmlFor="email"
              className="flex justify-between font-inter font-medium text-secondary text-sm"
            >
              Password
              <span className="text-primary font-inter font-normal text-xs cursor-pointer">
                Forgot password?
              </span>
            </label>
            <input
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg"
              type="password"
              id="pwd"
              {...register("password", { required: true })}
            />
          </div>
          {errors?.pwd && <p className="text-red-500">{errors.pwd.message}</p>}
          <button
            type="submit"
            className="bg-primary cursor-pointer p-3 rounded-lg w-full text-white font-semibold text-sm font-inter"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="text-secondary text-center mt-4 font-inter font-normal text-xs">
        Just browsing? <span className="underline">Continue as guest →</span>
      </div>
    </section>
  );
}

export default LoginForm;
