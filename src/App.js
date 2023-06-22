import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Reception from "./pages/Reception/Reception";
import History from "./pages/History/History";
import Repair from "./pages/Repair/Repair";
import Accounting from "./pages/Accounting/Accounting";
import SpareParts from "./pages/SpareParts/SpareParts";
import Telephones from "./pages/Telephones/Telephones";
import { useContext, useEffect } from "react";
import ctx from "./context/themeContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./Theme/ThemeConfig";
import { useDispatch } from "react-redux";
import { fetchTelephones } from "./redux/telephones/phones-operations";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import { Container } from "./App.stlyed";
// import Navbar from "./components/Navbar/MobileVersion";

function App() {
  const { themes } = useContext(ctx);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTelephones());
  }, [dispatch]);
  console.log(themes);
  return (
    <>
      <ThemeProvider theme={themes === "light" ? lightTheme : darkTheme}>
        <Container>
          <Navbar />

          <Routes>
            <Route path="/" element={<Reception />} />
            <Route path="/telephones" element={<Telephones />} />
            <Route path="/spareParts" element={<SpareParts />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/repair" element={<Repair />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Container>
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;
