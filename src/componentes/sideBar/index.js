"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function SideBarComponente() {
  return (
    <Sidebar aria-label="Default sidebar example" className="h-screen">
      <Sidebar.Items className="pt-20">
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <Link to="/">Home</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards} label="Pro" labelColor="dark">
            <Link to="/alunos">Alunos</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox} label="3">
            <Link to="/turmas">Turmas</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiUser}>
            <Link to="/CadastrarAluno">Cadastrar Aluno</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag}>
            <Link to="/CadastrarTurmas">Cadastrar Turmas</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight}>
            <Link to="/AlunosDesativados">Alunos Desativados</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable}>
            <Link to="/TurmasDesativadas">Turmas Desativadas</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
