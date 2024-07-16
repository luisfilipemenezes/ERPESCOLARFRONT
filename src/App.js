import logo from './logo.svg';
import { Routes,Route, } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import AlunosPag from "./pages/AlunosPag"
import DisiciplinasPag from "./pages/DisciplinasPag"
import CadastrarAluno from './pages/CadastrarAluno'
import PaginaDeCadastro from './pages/CadastroPag';
import LoginPag from './pages/LoginPag';

function App() {
  return (
    <Routes>
          <Route exact path="/"  element = {<Home/>}/>
          <Route exact path="/turmas"  element = {<DisiciplinasPag/>}/>
          <Route exact path="/alunos"  element = {<AlunosPag/>}/>
          <Route exact path="/CadastrarAluno"  element = {<CadastrarAluno/>}/>
          <Route exact path="/CadastrarAdmin"  element = {<PaginaDeCadastro/>}/>
          <Route exact path="/LoginAdmin"  element = {<LoginPag/>}/>
      </Routes>
  );
}

export default App;
