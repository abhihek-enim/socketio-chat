import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("SignUp");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 
      py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="max-w-md w-full space-y-8 
        bg-white bg-opacity-20 backdrop-blur-lg 
        rounded-xl shadow-2xl border border-white border-opacity-20 
        p-10"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {state}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {state == "SignUp" && (
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 
                  bg-white bg-opacity-20 backdrop-blur-lg 
                  border border-white border-opacity-30 
                  placeholder-gray-200 text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  placeholder="Username"
                />
              </div>
            )}

            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 
                  bg-white bg-opacity-20 backdrop-blur-lg 
                  border border-white border-opacity-30 
                  placeholder-gray-200 text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 
                  bg-white bg-opacity-20 backdrop-blur-lg 
                  border border-white border-opacity-30 
                  placeholder-gray-200 text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Password"
              />
            </div>
            <div>
              {state == "SignUp" ? (
                <p className="text-white text-base font-medium">
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-black cursor-pointer"
                  >
                    Login
                  </span>{" "}
                </p>
              ) : (
                <p
                  onClick={() => setState("SignUp")}
                  className="text-white text-base font-medium"
                >
                  Create an account{" "}
                  <span className="text-black cursor-pointer">SignUp</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center ">
            <button className="relative block group w-full  ">
              <span className="absolute inset-0  bg-indigo-500   rounded-lg"></span>
              <div className="transition   bg-black relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="p-2 ">
                  <p className="text-xl text-white font-outerSans font-medium">
                    {state}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
