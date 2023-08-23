import { Route, HashRouter as Router, Routes  } from 'react-router-dom'
import Navbar from './components/Navbar'
import "./styles/style.scss"
import Footer from './components/Footer'
import ItemListContainer from './components/ItemListContainer'
import Home from './components/Home'
import { Itemdeatil } from './components/Itemdeatil'
import { ShoppingCartProvider } from './context/ShopingCartContext'
import Register from './components/Register'
import Login from './components/Login'

function App() {


  return (
    <ShoppingCartProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home></Home>}/>
          <Route exact path='/category/:category' element={<ItemListContainer/>}/>
          <Route exact path='/detail/:id' element={<Itemdeatil></Itemdeatil>}/>
          <Route exact path='/register' element={<Register></Register>}/>
          <Route exact path='/login' element={<Login></Login>}/>
        </Routes>
        <Footer></Footer>
      </Router>
    </ShoppingCartProvider>
  )
}

export default App
