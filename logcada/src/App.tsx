import './App.scss'
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Header from './components/Header'  
import Navbar from './components/Navbar'
import Redefinir from './pages/Redefinir'
import Empresas from './pages/Empresas'
import Usuarios from './pages/Usuarios'
import Button from './components/Button'
import Seta from  './assets/icon/arrowIcon.svg'
import { useEffect, useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [showToTop, setShowToTop] = useState(false);
  useEffect(() => {
    const handleScrool = () => {
      setShowToTop(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScrool)
    return() => window.removeEventListener('scroll', handleScrool)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top:0, behavior: "smooth"})


  }

  return (
    <>
      <Header />
      <Navbar />
      
      {showToTop && (
        <div className='totop'>
        <Button tipo='redondo' onClick={scrollToTop}>
          <img src={Seta} alt="Seta" />
        </Button>
        </div>
      )}
      
      

      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']}/>}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'PADRAO']}/>}>
          <Route path="/empresas" element={<Empresas />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/redefinir" element={<Redefinir />} />
        <Route path="*" element={<Login />} />

      </Routes>

      
    </>
  );
}


export default App
