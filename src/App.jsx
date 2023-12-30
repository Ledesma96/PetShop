import { Route, HashRouter as Router, Routes  } from 'react-router-dom'
import "./styles/style.scss"
import { UserProvider } from './context/UserContext'
import { Cart, Login, Dashboard, Navbar, ItemListContainer, Itemdetail, Home, Footer, Contact, Profile, MyShopping} from './components/index.js'
import { PurchaseDetails } from './components/profile/components/PurchaseDetails.jsx'

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
            <Route exact path='/contact' element={<Contact></Contact>}/>
            <Route exact path='/profile' element={<Profile></Profile>}/>
            <Route exact path='/my-shopping' element={<MyShopping></MyShopping>}/>
            <Route exact path='/my-shopping/:id' element={<PurchaseDetails></PurchaseDetails>}/>
          </Routes>
          <Footer></Footer>
        </Router>
    </UserProvider>
  )
}

export default App
