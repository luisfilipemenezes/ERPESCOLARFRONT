import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment} from '@mui/material';
import { Button } from "flowbite-react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export default function FormularioAluno() {
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [countAge, setCountAge] = useState([]);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        // Função para preencher o array com números de 1 a 18 (por exemplo)
        function count() {
            let numbers = [];
            for (let i = 1; i <= 30; i++) {
                numbers.push(i);
            }
            setCountAge(numbers);
        }
        count();
    }, []);

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

    const handleSubmit = async () => {
        const aluno = {
            nome: name,
            idade: age,
            cpf: cpf
        };

        try {
            const response = await fetch('http://localhost:5000/criar', {
                method: 'POST',
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
                setTimeout(() => setShowSuccessToast(false), 4000);
            } else {
                console.error('Erro ao cadastrar aluno');
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição:', error);
        }
    };

    return (
        <>
           <div className='flex-1 px-10'>
                <div className='h-1/6  items-center  flex'>
                    <p className='text-2xl font-bold'>Cadastrar Aluno</p>
                </div>
                <div className='h-1/6 items-center  flex'>
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
                                    startAdornment: <InputAdornment position="start">CPF</InputAdornment>,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                </div>
                <div className='h-1/6 items-center  flex'>
                    <Button  onClick={handleSubmit} >Cadastrar</Button>
                </div>
                {showSuccessToast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Aluno cadastrado com sucesso.</div>
                    <Toast.Toggle />
                </Toast>
            )}


           </div>
        </>
    );
}
