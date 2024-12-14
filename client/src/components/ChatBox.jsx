const ChatBox = () => {
  return (
    <div className=" h-[90vh]  w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl border-opacity-20 p-10">
      {/* Header with user profile picture and username */}
      <div className="flex items-center space-x-4 border-b pb-4">
        <img
          src="/avatar_icon.png"
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <h2 className="text-xl font-semibold text-white">Username</h2>
        <div className="text-center text-xs text-green-500 font-medium">
          <p>Online</p>
        </div>
      </div>

      {/* Messages section */}
      <div className="flex flex-col space-y-4 h-80 overflow-y-auto py-4">
        {/* Received message */}
        <div className="flex items-start space-x-2">
          <img
            src="/avatar_icon.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-gray-200 p-3 rounded-lg">
            <p className="text-sm text-gray-800">This is a received message.</p>
            <span className="text-xs text-gray-500">10:30 AM</span>
          </div>
        </div>

        {/* Sent message */}
        <div className="flex items-start space-x-2 justify-end  ">
          <div className="bg-[#ECDFCC]  p-3 rounded-lg">
            <p className="text-sm text-gray-800">This is a sent message.</p>
            <span className="text-xs text-gray-500">10:32 AM</span>
          </div>
          <img
            src="/avatar_icon.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Input box with send button */}
      <div className="flex items-center space-x-2 border-t pt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECDFCC]"
        />
        <button className="bg-[#ECDFCC] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#e5cca6]">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
