import HeaderComponente from "../../componentes/header";
import SideBarComponente from "../../componentes/sideBar";
import FormularioAluno from '../../componentes/CadastrarAlunoComponente'
export default function CadastrarAluno() {
  return (
    <>
        <div className="h-screen w-screen  flex flex-row">
            <SideBarComponente/>
            <div className="flex flex-col w-full h-full ">
                <HeaderComponente/>
                <FormularioAluno/>
                
                
            </div>
        </div>
         
    </>
   
  );
}
