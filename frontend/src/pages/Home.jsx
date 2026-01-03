import MessageArea from "../components/MessageArea";
import Sidebar from "../components/Sidebar";
import GetMessages from "../customHooks/getMessages";

function Home() {
  GetMessages()
  return (

      <div className="w-full flex ">
        <Sidebar />
        <MessageArea />
      </div>

  );
}

export default Home;
