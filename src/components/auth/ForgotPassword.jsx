import { useForm } from "react-hook-form";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <section>
      <h2 className="font-jakarta font-bold text-2xl">Reset your password</h2>
      <p className="font-inter font-normal text-sm mt-1">
        Enter your email and we'll send a link.
      </p>
      <div className="pt-5">
        <form
          onSubmit={handleSubmit((form) => {
            console.log(form);
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
          {errors?.pwd && <p className="text-red-500">{errors.pwd.message}</p>}
          <button
            type="submit"
            className="bg-primary cursor-pointer p-3 rounded-lg w-full text-white font-semibold text-sm font-inter"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
