import HeaderComponente from "../../componentes/header";
import SideBarComponente from "../../componentes/sideBar";


export default function Home() {
  return (
    <>
        <div className="h-screen w-screen  flex flex-row">
            <SideBarComponente/>
            <div className="w-full">
                <HeaderComponente/>
                
            </div>
        </div>
         
    </>
   
  );
}
