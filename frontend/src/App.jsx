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
import Items from "./Admin/Items"
import Search from "./Admin/Search"
import PurshaseOrder from "./Admin/PurshaseOrder"
import Members from "./Admin/Members"
import Reports from "./Admin/Reports"
import ActivityLog from "./Admin/ActivityLog"
import AddItem from "./Admin/AddItem"
import AddCategory from "./Admin/AddCategory"
import OutOfStock from "./Admin/OutOfStock"
import ExpiredItems from "./Admin/ExpiredItems"
import LowInStock from "./Admin/LowInStock"

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
          {/* <Route path='/aboutUs' element={<AboutUs/>} /> */}
          <Route path='/contactUs' element={<ContactUs/>} />
          {/* Admin pages */}
          <Route path="/admin" element={<SideBar/>}>
            <Route index element={<AdminHomePage/>} />
            <Route path="items" element={<Items/>} />
            <Route path="items/add-item" element={<AddItem/>}/>
            <Route path="items/add-category" element={<AddCategory/>}/>
            <Route path="items/out-of-stock" element={<OutOfStock/>}/>
            <Route path="items/low-in-stock" element={<LowInStock/>}/>
            <Route path="items/expired-items" element={<ExpiredItems/>}/>
            <Route path="search" element={<Search/>} />
            <Route path="reports" element={<Reports/>} />
            <Route path="purshase-order" element={<PurshaseOrder/>} />
            <Route path="activities" element={<ActivityLog/>} />
            <Route path="members" element={<Members/>} />
          </Route>
        </Routes>
        {/* <Loc/> */}
      </Router>
    </>
  )
}

function Loc() {
  const location = useLocation();
  return (
    <>
      {(
        location.pathname !== '/login' && 
        location.pathname !== '/signUp' && 
        location.pathname !== '/admin/dashboard' &&
        location.pathname !== '/admin/items' &&
        location.pathname !== '/admin/search' &&
        location.pathname !== '/admin/purshase-order' &&
        location.pathname !== '/admin/reports' &&
        location.pathname !== '/admin/activities' &&
        location.pathname !== '/admin/members'
        )  && <Footer />}
      {/* {location.pathname !== '/signUp'  && <Footer />} */}
    </>
  );
}

export default App
