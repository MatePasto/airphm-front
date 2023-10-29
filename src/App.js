import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { usePage, PageProvider } from './context/page.context'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import HomePage from './pages/HomePage/HomePage'
import Friends from './components/profile/sub-components/friends/friends'
import Comentaries from './components/profile/sub-components/comentaries/cometaries'
import Publications from './components/profile/sub-components/publications/publications'
import Reserves from './components/profile/sub-components/reserves/reserves'
import Login from './pages/Login/Login'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Detail from './pages/Detalle/Detail'
import Profile from './components/profile/profile'
import Edit from './pages/Edit/Edit'


export default () => (
  <PageProvider>
    <App />
  </PageProvider>
)

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        { <Route path="/login" element={<Login />}></Route>}
        <Route path="*" element={<AppContent />}></Route>
      </Routes>
    </>
  )
}

const AppContent = () => {
  const [logged, setLogged] = useState(false)
  const { pageName } = usePage()

  return !routes.includes(window.location.pathname.split('/')[0]) ? (
    <>NOT FOUND</>
  ) : (
    <>
      <Paper
        sx={{ position: 'fixed', up: 0, left: 0, right: 0, zIndex: 1 }}
        elevation={3}
      >
        <Header title={pageName} />
      </Paper>

      <div className='page-conteiner'>
        <Routes>
          <Route path='home' element={<HomePage />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='create' element={<Edit />} />
          { sessionStorage.getItem('logged') != null
            ?
            <Route path='profile' element={<Profile />} >
              <Route path='reserves' element={<Reserves />} />
              <Route path='friends' element={<Friends />} />
              <Route path='comentaries' element={<Comentaries />} />
              <Route path='publications' element={<Publications />} />
            </Route>
            :
            <Route path='profile' element={<Navigate to ='/login' />} />
          }
        </Routes>
      </div>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Footer />
      </Paper>
    </>
  )
}

const routes = ['', 'home', 'detail', 'profile', 'login']
