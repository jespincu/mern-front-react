import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors &&
          registerErrors.length > 0 &&
          registerErrors.map((error, index) => (
            <div key={index} className="bg-red-500 text-white text-center my-2">
              {error}
            </div>
          ))}
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Register</h1>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.username && (
            <p className="text-red-500 my-2">{errors.username.message}</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && (
            <p className="text-red-500 my-2">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500 my-2">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
