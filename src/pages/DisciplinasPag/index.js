import HeaderComponente from "../../componentes/header";
import SideBarComponente from "../../componentes/sideBar";
import TabelaDisciplina from "../../componentes/TabelaTurma"

export default function DisiciplinasPag() {
  return (
    <>
        <div className="h-screen w-screen  flex flex-row">
            <SideBarComponente/>
            <div className="w-full">
                <HeaderComponente/>
                <TabelaDisciplina/>
            </div>
        </div>
         
    </>
   
  );
}
