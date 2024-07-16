import { useEffect, useState } from "react";
import HeaderComponente from "../../componentes/header";
import SideBarComponente from "../../componentes/sideBar";
import TabelaAlunos from '../../componentes/TabelaAlunos';
import axios from 'axios';
import { ModalToken } from "../../componentes/modalToken";
import { jwtDecode } from 'jwt-decode';

export default function AlunosPag() {
    const [TodosOsAlunos, setAlunos] = useState([]);
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
        GetAlunos()
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

      const GetAlunos = async () => {
          try {
              const alunos = await fetch(`http://localhost:5000/buscar`);
              const alunosResultado = await alunos.json();
              setAlunos(alunosResultado);
              console.log(alunosResultado);
          } catch (erro) {
              console.log('Erro ao Buscar dados', erro);
          }
      };

    

    return (
        <>
            <ModalToken openModal={openModal} setOpenModal={setOpenModal} />
            <div className="h-screen w-screen  flex flex-row">
                <SideBarComponente />
                <div className="w-full flex flex-col">
                    <HeaderComponente />
                    <TabelaAlunos alunos={TodosOsAlunos} />
                </div>
            </div>
        </>
    );
}
