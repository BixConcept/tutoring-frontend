import Home from "./Home";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import "./styles/App.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
	  <BrowserRouter>
	  <Navbar />
	  <Routes>
		<Route path="/" element={<Home />} />
		<Route path="/login" element={<LoginPage />} />
	  </Routes>
	  </BrowserRouter>
    </div>
  );
}

export default App;
