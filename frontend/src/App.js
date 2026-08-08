// import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import { useState } from 'react';
// import RefreshHandler from './RefreshHandler';

// function App() {

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" />
//   }
//   return (
//     <div className="App">
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//       <Routes>
//         <Route path='/' element={<Navigate to="/login" />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/home' element={<PrivateRoute element = {<Home />} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  return (
        <div className="app">

            <Navbar />

            <main>

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/products"
                        element={<Products />}
                    />
                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />
                    <Route
                        path="/cart"
                        element={<Cart />}
                    />
                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />

                </Routes>

            </main>

            <Footer />

        </div>
    );
}

export default App;