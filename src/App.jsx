import React, { useState } from "react";
import './App.css';
import GatepassForm from "./pages/Gatepassform";
import GatepassList from "./pages/GatepassList";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "./layouts/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={<GatepassForm />} />
        <Route path='/gatepassList' element={<GatepassList />} />
      </Route>
    )
  );

  return (
    // <div>
    //   <GatepassForm />
    //   <GatepassList/>
    // </div>

    <RouterProvider router={router} />
  );
}

export default App;
