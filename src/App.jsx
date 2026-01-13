import './App.css';
import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { AppProvider, useAuth } from './context/AppContext';
import { PAGE_TYPES } from './utils/Constants';

const ProtectedRoute = ({ children }) => {
    const {
        state: { isLoggedIn },
    } = useAuth();
    return isLoggedIn ? children : <Navigate to={`/${PAGE_TYPES.LOGIN}`} />;
};

const App = () => {
    return (
        <AppProvider>
            <Router basename='/expense-portal-demo'>
                <Header />
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path={`/${PAGE_TYPES.LOGIN}`} element={<Login />} />
                    <Route
                        path={`/${PAGE_TYPES.PAGE_REPORT}`}
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${PAGE_TYPES.DASHBOARD}`}
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<Navigate to={`/${PAGE_TYPES.LOGIN}`} />} />
                </Routes>
                <Footer />
            </Router>
        </AppProvider>
    );
};

export default App;
