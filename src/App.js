import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Reception from "./pages/Reception/Reception";
import History from "./pages/History/History";
import Repair from "./pages/Repair/Repair";
import Accounting from "./pages/Accounting/Accounting";
import SpareParts from "./pages/SpareParts/SpareParts";
import Telephones from "./pages/Telephones/Telephones";
// import Navbar from "./components/Navbar/MobileVersion";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Reception />} />
        <Route path="/telephones" element={<Telephones />} />
        <Route path="/spareParts" element={<SpareParts />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
