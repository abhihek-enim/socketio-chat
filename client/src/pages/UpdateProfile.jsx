import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { postData } from "../utils/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, setUser, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      let form = new FormData();
      form.append("username", formData.username);
      form.append("bio", formData.bio);
      form.append("profilePicture", image);
      let res = await postData("/user/updateProfile", form);
      if (res.success) {
        setUser(res.data);
        hideLoader();
        navigate("/chat");
      } else {
        toast.error(res.message);
        hideLoader();
      }
    } catch (error) {
      console.log(error);
      hideLoader();
    }
    setFormData({
      username: user?.username || "",
      bio: user?.bio || "",
    });
    setImage(null);
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
          <h2 className="mt-3 text-center text-3xl font-extrabold text-white">
            Update Profile
          </h2>
        </div>
        <div className="  flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {/* Edit Icon */}
            <img
              className="absolute w-6 bottom-0 left-12 cursor-pointer bg-white rounded-md    bg-opacity-50"
              src="https://icons.veryicon.com/png/o/internet--web/collection-and-payment/pencil-43.png"
              alt="edit_icon"
              onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
            />

            {/* Avatar */}
            <img
              className="w-[120px] rounded-full"
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.profilePicture
                  ? user?.profilePicture
                  : "/avatar_icon.png" // Default avatar
              }
              alt="Avatar"
            />

            {/* Hidden File Input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])} // Handle file selection
            />
          </div>

          <div className="w-full">
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
          <div className="w-full">
            <input
              id="bio"
              name="bio"
              type="text"
              required
              value={formData.bio}
              onChange={handleChange}
              className="  appearance-none rounded-md relative block w-full px-3 py-2 
                  bg-white bg-opacity-20 backdrop-blur-lg 
                  border border-white border-opacity-30 
                  placeholder-gray-200 text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              placeholder="Bio"
            />
          </div>
          <div className="flex justify-center mt-3 w-full">
            <button className="relative block group  w-full">
              <span className="absolute inset-0  bg-indigo-500   rounded-lg"></span>
              <div className="transition   bg-black relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="p-2 ">
                  <p
                    onClick={handleClick}
                    className="text-xl text-white font-outerSans font-medium"
                  >
                    Submit
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
