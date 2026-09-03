import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

// import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/LoginSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // const { login } = useAuth();

  const handleLogin = async (form) => {
    const loginPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const organizerEmail = import.meta.env.VITE_ORGANIZER_EMAIL;
        const organizerPassword = import.meta.env.VITE_ORGANIZER_PASSWORD;

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (
          form.email === organizerEmail &&
          form.password === organizerPassword
        ) {
          dispatch(
            loginUser({
              fullName: import.meta.env.VITE_ORGANIZER_NAME || "Organizer",
              email: organizerEmail,
              role: import.meta.env.VITE_ORGANIZER_ROLE || "organizer",
            }),
          );
          resolve(`Welcome back, ${import.meta.env.VITE_ORGANIZER_NAME}!`);
          return;
        }

        if (
          form.email === adminEmail &&
          form.password === adminPassword
        ) {
          dispatch(
            loginUser({
              fullName: import.meta.env.VITE_ADMIN_NAME || "Admin",
              email: adminEmail,
              role: import.meta.env.VITE_ADMIN_ROLE || "admin",
            }),
          );
          resolve(`Welcome back, ${import.meta.env.VITE_ADMIN_NAME}!`);
          return;
        }

        const foundUser = userState.users.find(
          (u) => u.email === form.email && u.password === form.password,
        );

        if (foundUser) {
          dispatch(
            loginUser({
              fullName: foundUser.fullName,
              email: form.email,
              role: foundUser.role,
              joined_events: foundUser.joined_events || [],
              saved_events: foundUser.saved_events || [],
              joined_communities: foundUser.joined_communities || [],
            }),
          );
          resolve(`Welcome back, ${foundUser.fullName}!`);
          return;
        }

        reject("Incorrect email or password.");
      }, 1000);
    });

    toast.promise(loginPromise, {
      loading: "Signing in...",
      success: (msg) => {
        navigate("/");
        return msg;
      },
      error: (err) => {
        setError("password", { type: "manual", message: err });
        return `Login Failed. ${err}`;
      },
    });
  };

  return (
    <section>
      <h2 className="font-jakarta font-bold text-2xl">Welcome back</h2>
      <p className="font-inter font-normal text-sm mt-1">
        Don't have an account?{" "}
        <span className="font-inter font-medium text-sm text-primary">
          <Link to="/signup">Sign Up</Link>
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
        <form onSubmit={handleSubmit(handleLogin)}>
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
              <Link to="/forgot-password" className="text-primary font-inter font-normal text-xs cursor-pointer">
                Forgot password?
              </Link>
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
        Just browsing? <Link to="/" className="underline">Continue as guest →</Link>
      </div>
    </section>
  );
}

export default LoginForm;
