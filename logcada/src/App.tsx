import './App.scss'
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Header from './components/Header'  
import Navbar from './components/Navbar'
import Redefinir from './pages/Redefinir'
import Empresas from './pages/Empresas'
import Usuarios from './pages/Usuarios'

function App() {
  return (
    <>
      <Header />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/redefinir" element={<Redefinir />} />
      </Routes>
    </>
  );
}


export default App
