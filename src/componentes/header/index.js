
'use client';

import { Button, MegaMenu, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { jwtDecode } from 'jwt-decode';


export default function HeaderComponenteComponent() {
  const [usuarioLogado,setUsuarioLogado] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
       setUsuarioLogado(localStorage.getItem('usuario'))
    } else {
        
    localStorage.removeItem('token');
    }
  }, []);

  const isTokenValid = (token) => {
    if (!token) return false;
  
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  
    return decodedToken.exp > currentTime;
  };

  function handleClearToken(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <MegaMenu className=' border-b-neutral-700 border-2'>
      <div className="mx-auto flex  w-full flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/">
          <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Admin</span>
        </Navbar.Brand>
        {usuarioLogado?<div className='self-center order-2 hidden items-center md:flex whitespace-nowrap text-xl font-semibold dark:text-white'>{usuarioLogado}<Button onClick={handleClearToken} style={{ backgroundColor: 'red' }}>Sair</Button>
</div>:<div className="order-2 hidden items-center md:flex">
          <Link
            to="/LoginAdmin"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            Login
          </Link>
          <Link to='/CadastrarAdmin'>
            <Button >Inscreva-se</Button>
          </Link>
          
        </div>}
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <MegaMenu.Dropdown toggle={<>Outros Projetos</>}>
            <ul className="grid grid-cols-3">
              <div className="space-y-4 p-4">
                <li>
                  <a href="#" className="hover:text-primary-600 text-black dark:hover:text-primary-500">
                    Experiência
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    TelleGrup
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Fintelli
                  </a>
                </li>
              
              </div>
              <div className="space-y-4 p-4">
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 text-black dark:hover:text-primary-500">
                    Entre em Contato
                  </a>
                </li>
                <li>
                  <a target="_blank"  href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Linkedln
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Currículo
                  </a>
                </li>
                
              </div>
              <div className="space-y-4 p-4">
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 text-black dark:hover:text-primary-500">
                    Projetos de Extensão
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Invista CG
                  </a>
                </li>
               
              </div>
            </ul>
          </MegaMenu.Dropdown>
          <Navbar.Link target="_blank" href="https://github.com/luisfilipemenezes?tab=repositories">GitHub</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
