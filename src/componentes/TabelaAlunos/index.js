"use client";

import { Table} from "flowbite-react";
import { Pagination } from "flowbite-react";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment} from '@mui/material';
import { Toast } from "flowbite-react";
import { useState,useEffect } from "react"
import { Link } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";


export default function TabelaAlunos({ alunos }) {
  const primeiroTresAlunos = alunos.slice(0, 3); // Pega apenas os 3 primeiros alunos
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [countAge, setCountAge] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [alunoId,SetId] = useState('')
  const [mensagem,setMensagem] = useState('')


  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    // Função para preencher o array com números de 1 a 18 (por exemplo)
    function count() {
        let numbers = [];
        for (let i = 1; i <= 18; i++) {
            numbers.push(i);
        }
        setCountAge(numbers);
    }
    count();
}, []);

const handleID = (id) =>{
  setOpenModal(true)
    SetId(id)
}

const handleChangeAge = (event) => {
  setAge(event.target.value);
};

const handleChangeName = (event) => {
  setName(event.target.value);
};

const handleChangeCpf = (event) => {
  const regex = /^[0-9\b]+$/; // Regex para aceitar apenas números
  if (event.target.value === '' || regex.test(event.target.value)) {
      setCpf(event.target.value);
  }
};

const handleDelete = async ()=>{

  const aluno = {
    id:alunoId,
};

  try {
    const response = await fetch(`http://localhost:5000/deletar`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
  });

      if (response.ok) {
          // Limpa os campos do formulário após o envio
          setName('');
          setAge('');
          setCpf('');
          setShowSuccessToast(true);
          // Oculta o toast após alguns segundos
          setMensagem("Deletado")
          setTimeout(() => setShowSuccessToast(false), 2000);
          setTimeout(() => window.location.reload(), 2000);

      } else {
          console.error('Erro ao deletar aluno');
      }
  } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
  }
  setOpenModal(false)

}

const handleSubmit = async () => {
  const aluno = {
      id:alunoId,
      nome: name,
      idade: age,
      cpf: cpf
  };

  try {
    const response = await fetch(`http://localhost:5000/atualizar`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
  });

      if (response.ok) {
          
          // Limpa os campos do formulário após o envio
          
          setName('');
          setAge('');
          setCpf('');
          setShowSuccessToast(true);
          // Oculta o toast após alguns segundos
          setMensagem("Atualizado")
          setTimeout(() => setShowSuccessToast(false), 2000);
          setTimeout(() => window.location.reload(), 2000);

      } else {
          console.error('Erro ao cadastrar aluno');
      }
  } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
  }
  setOpenModal(false)
};
  
  return (
    <div className="flex-1 px-10">
      <div className='h-1/6  items-center  justify-between flex'>
          <p className='text-2xl font-bold'>Alunos Ativos</p>
          <Link to = '/CadastrarAluno'>
            <Button >Cadastar Novo Aluno</Button>
          </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>NOME</Table.HeadCell>
            <Table.HeadCell>IDADE</Table.HeadCell>
            <Table.HeadCell>CPF</Table.HeadCell>
            <Table.HeadCell>STATUS</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {primeiroTresAlunos.map((aluno) => (
              <Table.Row key={aluno.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {aluno.nome}
                </Table.Cell>
                <Table.Cell>{aluno.idade}</Table.Cell>
                <Table.Cell>{aluno.cpf}</Table.Cell>
                <Table.Cell>{aluno.status}</Table.Cell>
                <Table.Cell onClick={() => handleID(aluno.id)}>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Editar
                  </a>
                  
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex w-full h-1/6 items-end  sm:justify-end">
            <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Editar Aluno</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="name"
                                label="Name"
                                value={name}
                                onChange={handleChangeName}
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChangeAge}
                            >
                                {countAge.map((number) => (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="cpf"
                                label="CPF"
                                value={cpf}
                                onChange={handleChangeCpf}
                                variant="outlined"
                                InputProps={{
                                    inputProps: {
                                        maxLength: 11, // Limita o número máximo de caracteres para CPF
                                    },
                                    startAdornment: <InputAdornment position="start">{alunoId}</InputAdornment>,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Confirmar Alterações</Button>
            <Button color="gray" onClick={handleDelete}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>


        {showSuccessToast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Aluno {mensagem} com sucesso.</div>
                    <Toast.Toggle />
                </Toast>
            )}

    </div>
  );
}
