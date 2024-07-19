
"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export function FormaCadastroComponente() {

  const [usuario,setusuario] = useState("")
  const [ senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  async function handleSubmit(){
     if(senha ===confirmarSenha){
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario, senha }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
  
        alert('Cadastro bem-sucedido! Agora você pode fazer login.');
      } catch (error) {
        alert('Erro ao fazer cadastro: ' + error.message);
      }
     }else{
      alert("Senhas Diferentes")
     }
  }

  return (
    <form onSubmit={handleSubmit} className="flex p-20 drop-shadow-lg flex-1 bg-gray-100 max-w-xl flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Digite seu email" />
        </div>
        <TextInput onChange={(e)=>{setusuario(e.target.value)}} id="email2" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Digite sua senha" />
        </div>
        <TextInput id="password2" onChange={(e)=> setSenha(e.target.value)} type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Confirme sua senha" />
        </div>
        <TextInput id="repeat-password" onChange={(e=> setConfirmarSenha(e.target.value))} type="password" required shadow />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          Concordo com os&nbsp;
          <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
            termos e condições
          </Link>
        </Label>
      </div>
      <Button type="submit">Criar Conta</Button>
      <Link to='/' className="text-cyan-600 text-center  hover:underline dark:text-cyan-500">
            Voltar a página principal
        </Link>
      
    </form>
  );
}
