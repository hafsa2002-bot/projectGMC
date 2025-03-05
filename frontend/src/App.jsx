import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./HomePage"
import Login from "./Login"
import SignUp from "./SignUp"
import CategoryPage from "./CategoryPage"
import Nav from "./Client/Nav"
import Footer from "./Footer"
import AboutUs from "./AboutUs"
import ContactUs from "./ContactUs"
import ProductsPage from "./Client/ProductsPage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/products' element={<Nav details={true} />}>
            <Route index element ={<ProductsPage/>} />
            <Route path = ":category" element={<CategoryPage/>} />
          </Route>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/signUp" element={<SignUp/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/contactUs' element={<ContactUs/>} />
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
      {(location.pathname !== '/login' && location.pathname !== '/signUp')  && <Footer />}
      {/* {location.pathname !== '/signUp'  && <Footer />} */}
    </>
  );
}

export default App
