import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LeftSideBar from "../components/LeftSideBar";
import ChatBox from "../components/ChatBox";
import RightSideBar from "../components/RightSideBar";

const Chat = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 
    py-12 px-4 sm:px-6 lg:px-8"
    >
      <LeftSideBar />
      <ChatBox />
      <RightSideBar />
    </div>
  );
};

export default Chat;
