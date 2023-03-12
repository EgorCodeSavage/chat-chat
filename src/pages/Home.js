import InputBlock from "../components/InputBlock/InputBlock";
import MainChat from "../components/MainChat/MainChat";
import TopBar from "../components/topbar/TopBar";
import Sidebar from "./../components/SideBar/Sidebar";


const Home = () => {
    


    return ( 
        <div className="home_page">
            <Sidebar />
            <div className="chat">
                <TopBar />
                <MainChat />
                <InputBlock />
            </div>
        </div>
     );
}
 
export default Home;