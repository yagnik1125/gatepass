import React, { useState } from "react";
import './App.css';
import GatepassForm from "./Gatepassform";
import GatepassList from "./GatepassList";

function App() {
  return (
    <div>
      <GatepassForm />
      <GatepassList/>
    </div>
  );
}

export default App;
