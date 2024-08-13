import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Carts from "./Pages/Carts/Carts";
import Footer from "./Components/Footer/Footer";
import LoggedIn from "./Components/LoggedIn/LoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Spinner from "./Components/Spinner/Spinner";

function App() {
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {showLoggedIn ? <LoggedIn setShowLoggedIn={setShowLoggedIn} /> : <></>}

      <div className="App">
        {/* mount the component */}
        <Navbar setShowLoggedIn={setShowLoggedIn} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Use Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/edit" element={<Sidebar />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
