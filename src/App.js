import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Reception from './pages/Reception/Reception';
import Repair from './pages/Repair/Repair';
// import History from "./pages/History/History";
// import Accounting from "./pages/Accounting/Accounting";
import SpareParts from './pages/SpareParts/SpareParts';
import Telephones from './pages/Telephones/Telephones';
import { useContext, useEffect } from 'react';
import ctx from './context/themeContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './Theme/ThemeConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTelephones } from './redux/telephones/phones-operations';
import Diagnosis from './pages/Diagnosis/Diagnosis';
import { Container, ContainerContent } from './App.stlyed';
import { getLoading } from './redux/telephones/phones-selector';
import User from './pages/User/User';
import Register from './pages/Register/Register';
import PablicRoute from './components/Route/PablicRoute';
import PrivateRoute from './components/Route/PrivateRoute';
import authOperations from './redux/auth/auth-operatins';
import {
  getIsFetchingCurrent,
  getLoggedIn,
  getUserLoading,
} from './redux/auth/auth-selectors';
import NoMatch from './pages/NoMatch/NoMatch';
import ButtonUp from './components/ButtonUp/ButtonUp';
import { fetchStorage } from './redux/storage/storage-operations';
import OneItemSpareParts from './pages/SpareParts/OneItemSpareParts/OneItemSpareParts';

function App() {
  const { themes } = useContext(ctx);
  const dispatch = useDispatch();
  const loadingPhone = useSelector(getLoading);
  const loadingUser = useSelector(getUserLoading);
  const loggedIn = useSelector(getLoggedIn);
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);
  console.log('ss');

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchTelephones());
      dispatch(fetchStorage());
    } else {
      dispatch(authOperations.fetchCurrentUser());
    }
  }, [dispatch, loggedIn]);

  return (
    <Container>
      <ThemeProvider theme={themes === 'light' ? lightTheme : darkTheme}>
        <Navbar />
        {!isFetchingCurrentUser && (
          <ContainerContent load={loadingPhone && loadingUser}>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Reception />} />
              </Route>
              <Route path="/telephones" element={<PrivateRoute />}>
                <Route path="/telephones" element={<Telephones />} />
              </Route>
              <Route path="/repair" element={<PrivateRoute />}>
                <Route path="/repair" element={<Repair />} />
              </Route>
              <Route path="/diagnosis" element={<PrivateRoute />}>
                <Route path="/diagnosis" element={<Diagnosis />} />
              </Route>
              {/* <Route path="/history" element={<PrivateRoute />}>
                <Route path="/history" element={<History />} />
              </Route> */}
              <Route path="/spareParts" element={<PrivateRoute />}>
                <Route path="/spareParts" element={<SpareParts />} />
                <Route path=":id" element={<OneItemSpareParts />} />
              </Route>
              {/* <Route path="/accounting" element={<PrivateRoute />}>
                <Route path="/accounting" element={<Accounting />} />
              </Route> */}
              <Route path="/user" element={<PablicRoute restricted />}>
                <Route path="/user" element={<User />} />
              </Route>
              <Route path="/register" element={<PablicRoute restricted />}>
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="*" element={<NoMatch />}></Route>
            </Routes>
          </ContainerContent>
        )}
        <ButtonUp />
        <GlobalStyles />
      </ThemeProvider>
    </Container>
  );
}

export default App;
