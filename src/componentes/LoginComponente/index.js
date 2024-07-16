"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginComponente() {
  const [usuario, setUsername] = useState('Filipe@gmail.com');
  const [senha, setPassword] = useState('');

  async function handleSubmitForm(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();
      
      

      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');
      
      
      // Redirecionar para a página de destino após o login, se necessário
      // history.push('/pagina-depois-do-login');

    } catch (err) {
      alert('Erro ao fazer Login: ' + err.message); // Exiba mensagem de erro detalhada
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="flex p-20 drop-shadow-lg flex-1 bg-gray-100 max-w-xl flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Digite seu email" />
        </div>
        <TextInput onChange={(e) => setUsername(e.target.value)} id="email2" type="email" value={usuario} placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Digite sua senha" />
        </div>
        <TextInput onChange={(e) => setPassword(e.target.value)} id="password2" type="password" value={senha} required shadow />
      </div>
     
      <Button type="submit">Entrar</Button>
      <Link to='/' className="text-cyan-600 text-center  hover:underline dark:text-cyan-500">
        Voltar à página principal
      </Link>
    </form>
  );
}
