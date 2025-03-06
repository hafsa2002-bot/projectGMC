import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./Client/HomePage"

import Login from "./Login"
import SignUp from "./SignUp"
import CategoryPage from "./Client/CategoryPage"
import Nav from "./Client/Nav"
import Footer from "./Client/Footer"
import AboutUs from "./Client/AboutUs"
import ContactUs from "./Client/ContactUs"
import ProductsPage from "./Client/ProductsPage"
import SideBar from "./Admin/SideBar"
import AdminHomePage from "./Admin/AdminHomePage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Client pages */}
          <Route path="/" element={<HomePage/>} />
          <Route path='/products' element={<Nav details={true} />}>
            <Route index element ={<ProductsPage/>} />
            <Route path = ":category" element={<CategoryPage/>} />
          </Route>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/signUp" element={<SignUp/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/contactUs' element={<ContactUs/>} />
          {/* Admin pages */}
          <Route path="/admin" element={<SideBar/>}>
            <Route index element={<AdminHomePage/>} />
          </Route>
        </Routes>
        <Loc/>
      </Router>
    </>
  )
}

function Loc() {
  const location = useLocation();

  return (
    <>
      {(location.pathname !== '/login' && location.pathname !== '/signUp' && location.pathname !== '/admin')  && <Footer />}
      {/* {location.pathname !== '/signUp'  && <Footer />} */}
    </>
  );
}

export default App
