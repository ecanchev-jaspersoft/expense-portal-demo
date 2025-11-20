import './App.css';
import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const {
        state: { isLoggedIn },
    } = useAuth();
    return isLoggedIn ? children : <Navigate to='/login' />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router basename='/expense-portal-demo'>
                <Header />
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/dashboard'
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
