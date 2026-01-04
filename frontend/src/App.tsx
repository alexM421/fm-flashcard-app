import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";

function App() {
  return (
    <div id="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
