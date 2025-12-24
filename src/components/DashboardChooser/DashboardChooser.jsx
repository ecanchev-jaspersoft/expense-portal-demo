import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './DashboardChooser.css';

const DashboardChooser = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    if (!isOpen) return null;

    const handleChoice = (route) => {
        dispatch({ type: 'SET_SELECTED_PAGE', payload: route.split('/').pop() });
        navigate(route);
        onClose();
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>Choose Your Dashboard</h2>
                <p>Select which dashboard you would like to access:</p>
                <div className='dashboard-options'>
                    <button className='dashboard-option-btn primary' onClick={() => handleChoice('/pageReport')}>
                        <div className='option-icon'>📊</div>
                        <div className='option-text'>
                            <h3>Page Report</h3>
                            <p>View report and update its content while hiding or showing specific attributes</p>
                        </div>
                    </button>
                    <button className='dashboard-option-btn secondary' onClick={() => handleChoice('/dashboard')}>
                        <div className='option-icon'>📈</div>
                        <div className='option-text'>
                            <h3>Interactive Dashboard</h3>
                            <p>View dashboard and interact with the content by updating its input controls (filters)</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardChooser;
