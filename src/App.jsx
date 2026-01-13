import './App.css';
import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { AppProvider, useAuth } from './context/AppContext';

const ProtectedRoute = ({ children }) => {
    const {
        state: { isLoggedIn },
    } = useAuth();
    return isLoggedIn ? children : <Navigate to='/login' />;
};

const App = () => {
    return (
        <AppProvider>
            <Router basename='/expense-portal-demo'>
                <Header />
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/pageReport'
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/dashboard'
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<Navigate to='/login' />} />
                </Routes>
                <Footer />
            </Router>
        </AppProvider>
    );
};

export default App;
