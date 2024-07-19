import HeaderComponente from "../../componentes/header";
import SideBarComponente from "../../componentes/sideBar";
import FormularioAluno from '../../componentes/CadastrarAlunoComponente'
import { ModalToken } from "../../componentes/modalToken";
import { useState,useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


export default function CadastrarAluno() {
  const [openModal, setOpenModal] = useState();
  const [openCadastro, setOpenCadastro] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      setOpenCadastro(true)
    } else {
        setOpenModal(true)
    localStorage.removeItem('token');
    }
  }, []);

  const isTokenValid = (token) => {
    if (!token) return false;
  
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  
    return decodedToken.exp > currentTime;
  };

  return (
    <>
        <ModalToken openModal={openModal} setOpenModal={setOpenModal} />
        <div className="h-screen w-screen  flex flex-row">
            <SideBarComponente/>
            <div className="flex flex-col w-full h-full ">
                <HeaderComponente/>
                <FormularioAluno openCadastro={openCadastro}/>
            </div>
        </div>
         
    </>
   
  );
}
