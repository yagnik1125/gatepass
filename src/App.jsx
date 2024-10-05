import React, { useState } from "react";
import './App.css';
import GatepassForm from "./pages/Gatepassform";
import GatepassList from "./pages/GatepassList";

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<Layout />} >
  //       <Route path='' element={<GatepassForm />} />
  //       <Route path='/gatepassList' element={<GatepassList />} />
  //     </Route>
  //   )
  // );
  return (
    <div>
      <GatepassForm />
      <GatepassList/>
    </div>
  );
}

export default App;
