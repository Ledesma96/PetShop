import { Route, HashRouter as Router, Routes  } from 'react-router-dom'
import "./styles/style.scss"
import { UserProvider } from './context/UserContext'
import { Cart, Login, Dashboard, Navbar, ItemListContainer, Itemdetail, Home, Footer} from './components/index.js'
function App() {


  return (
    <UserProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route exact path='/' element={<Home></Home>}/>
            <Route exact path='/category/:category' element={<ItemListContainer/>}/>
            <Route exact path='/detail/:id' element={<Itemdetail></Itemdetail>}/>
            <Route exact path='/login' element={<Login></Login>}/>
            <Route exact path='/dashboard/*' element={<Dashboard></Dashboard>}/>
            <Route exact path='/cart' element={<Cart></Cart>}/>
          </Routes>
          <Footer></Footer>
        </Router>
    </UserProvider>
  )
}

export default App
