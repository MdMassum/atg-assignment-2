import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login-page/Login";
import Signup from "./pages/signup-page/Signup";
import Home from "./pages/home-page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";

function Layout() {
  const location = useLocation();
  const showHeaderFooter = location.pathname === "/home";

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
