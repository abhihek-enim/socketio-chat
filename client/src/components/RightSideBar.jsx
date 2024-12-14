const RightSideBar = () => {
  return (
    <div className=" h-[90vh] max-w-md w-full bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl border-opacity-20 p-10 space-y-6">
      {/* User profile picture and username */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/avatar_icon.png"
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-xl font-semibold text-white">Username</h2>
      </div>

      {/* User bio */}
      <div className="text-center text-white">
        <p className="text-sm">
          This is the user bio. It can include details about the user.
        </p>
      </div>

      {/* Last seen/online status */}
      <div className="text-center text-green-500 font-medium">
        <p>Online</p>
      </div>

      {/* Sent images in grid format */}
      <div className="h-48 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {/* Replace src with actual image paths */}
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index}
              src="/avatar_icon.png"
              alt={`Sent image ${index + 1}`}
              className="h-20 object-cover rounded-lg cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Logout button */}
      <div className="flex justify-center">
        <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
