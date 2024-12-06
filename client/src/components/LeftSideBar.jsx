const users = [
  {
    profilePicture: "/avatar_icon.png",
    username: "john_doe",
    email: "john.doe@example.com",
    lastMessage: "Hey there! How's it going?",
  },
  {
    profilePicture: "/avatar_icon.png",
    username: "jane_smith",
    email: "jane.smith@example.com",
    lastMessage: "Can we meet tomorrow for lunch?",
  },
  {
    profilePicture: "/avatar_icon.png",
    username: "alex_jones",
    email: "alex.jones@example.com",
    lastMessage: "Looking forward to our project review.",
  },
  {
    profilePicture: "/avatar_icon.png",
    username: "emily_clark",
    email: "emily.clark@example.com",
    lastMessage: "I sent you the report, please check it out.",
  },
  {
    profilePicture: "/avatar_icon.png",
    username: "mark_taylor",
    email: "mark.taylor@example.com",
    lastMessage: "Thanks for your help with the presentation.",
  },
];

const LeftSideBar = () => {
  return (
    <div
      className="max-w-md w-full space-y-8 
    bg-white bg-opacity-20 backdrop-blur-lg 
     shadow-2xl  border-opacity-20 
    p-10"
    >
      <div>
        <h3 className="text-2xl text-white font-semibold">Friends List:</h3>
      </div>
      <div>
        <input
          id="username"
          name="username"
          type="text"
          required
          //   value={formData.username}
          //   onChange={handleChange}
          className="appearance-none rounded-md relative block w-full px-3 py-2 
                  bg-white bg-opacity-20 backdrop-blur-lg 
                  border border-white border-opacity-30 
                  placeholder-gray-200 text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          placeholder="Search Friend.."
        />
      </div>

      <div className="bg-gradient-to-b from-blue-400 via-indigo-400 to-red-300 p-3 rounded-lg ">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex justify-start items-center cursor-pointer border-b-2 border-gray-500 "
          >
            <img src={user.profilePicture} className="w-12" alt="" />
            <div className="px-3 py-2">
              <h3 className="text-white text-xl font-semibold">
                {user.username}
              </h3>
              <p className="text-base text-gray-700 font-medium">
                {user.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
