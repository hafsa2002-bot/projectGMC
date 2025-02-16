import './App.css';
// import Nav from './Nav';
// import Footer from './Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <>

    {/* <Nav/>
    <Footer/> */}
    <Router>
      <Routes>
        <Route path = "/" element={<HomePage/>} />
        <Route path = "/login" element={<Login/>} />
        <Route path = "/signUp" element={<SignUp/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
