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
        <Button type='redondo' onClick={scrollToTop}>
          <img src={Seta} alt="Seta" />
        </Button>
        </div>
      )}
      
      

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
