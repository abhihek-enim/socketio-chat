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
    bg-[#181C14] 
    py-12 px-4 sm:px-6 lg:px-8"
    >
      <LeftSideBar />
      <div className="flex-1">
        {" "}
        <ChatBox />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Chat;
