import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./Client/HomePage/HomePage"
import Login from "./Login"
import SignUp from "./SignUp"
import CategoryPage from "./Client/ProductsPages/CategoryPage"
import Nav from "./Client/NavBar/Nav"
import Footer from "./Client/Footer"
import ContactUs from "./Client/ContactUs"
import ProductsPage from "./Client/ProductsPages/ProductsPage"
import SideBar from "./Admin/SideBar"
import AdminHomePage from "./Admin/Dashboard/AdminHomePage"
import Items from "./Admin/ItemsPage/Items"
import Search from "./Admin/Search"
import Members from "./Admin/Members/Members"
import Reports from "./Admin/Reports/Reports"
import ActivityLog from "./Admin/ActivityLog"
import AddItem from "./Admin/ItemsPage/AddItem"
import AddCategory from "./Admin/ItemsPage/AddCategory"
import OutOfStock from "./Admin/ItemsPage/OutOfStock"
import ExpiredItems from "./Admin/ItemsPage/ExpiredItems"
import LowInStock from "./Admin/ItemsPage/LowInStock"
import ViewProduct from "./Admin/ItemsPage/ViewProduct"
import ItemsRoute from "./Admin/ItemsPage/ItemsRoute"
import AllItems from "./Admin/ItemsPage/AllItems"
import CategoryItems from "./Admin/ItemsPage/CategoryItems"
import AllCategories from "./Admin/ItemsPage/AllCategories"
import CategoryInfo from "./Admin/ItemsPage/CategoryInfo"
import Checkout from "./Client/CheckOut/Checkout"
import Order from "./Admin/OrderPage/Order"
import ViewOrder from "./Admin/OrderPage/ViewOrder"
import AddOrder from "./Admin/OrderPage/AddOrder"
import UpdateItem from "./Admin/ItemsPage/UpdateItem"
import ProtectedRoute from "./ProtectedRoute"
import Unauthorized from "./Unauthorized"
import AddMember from "./Admin/Members/AddMember"
import {jwtDecode} from 'jwt-decode';
import ProductDetails from "./Client/ProductsPages/ProductDetails"
function App() {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role; // Assuming the token has a `role` field
  }

  return (
    <>
      <Router>
        <Routes>
          {/* Client pages */}
          <Route path="/" element={<HomePage/>} />
          <Route path='/products' element={<Nav details={true} />}>
            <Route index element ={<ProductsPage/>} />
            <Route path = ":product_id" element={<ProductDetails/>} />
            <Route path = "category/:category" element={<CategoryPage/>} />
          </Route>
          <Route path='/contactUs' element={<ContactUs/>} />
          <Route path="checkout" element={<Checkout/>}/>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/signUp" element={<SignUp/>} />

          {/* Admin pages */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <SideBar/>
            </ProtectedRoute>
          }>
            <Route index element={<AdminHomePage/>} />
            <Route path="items" element={<ItemsRoute/>}>
              <Route path="" element={<Items/>}>
                <Route index element={<AllItems/>}/>
              </Route>
              <Route path="add-item" element={<AddItem/>}/>
              <Route path="update-item/:id" element={<UpdateItem/>}/>
              <Route path="categories">
                <Route index element={<AllCategories/>}/>
                <Route path=":categoryId" element={<CategoryInfo/>}/>
              </Route>
              <Route path="out-of-stock" element={<OutOfStock/>}/>
              <Route path="low-in-stock" element={<LowInStock/>}/>
              <Route path="expired-items" element={<ExpiredItems/>}/>
              <Route path="view/:product_id" element={<ViewProduct/>}/>
            </Route>
            <Route path="search" element={<Search/>} />
            <Route path="orders" element={<Order/>} />
            <Route path="view_order/:id" element={<ViewOrder/>}/>
            <Route path="add-order" element={<AddOrder/>}/>
            <Route path="reports" element={<Reports/>} />
            <Route path="activities" element={<ActivityLog/>} />
            <Route 
              path="members" 
              element={userRole === "admin"  ? <Members/> : <AdminHomePage/>} 
            />
            <Route path="add-member" element={<AddMember/>} />
          </Route>
          <Route  path="/unauthorized" element={<Unauthorized/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
