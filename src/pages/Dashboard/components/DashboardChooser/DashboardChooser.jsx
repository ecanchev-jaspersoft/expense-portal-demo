import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AppContext';
import { PAGE_TYPES, AUTH_ACTIONS } from '../../../../utils/Constants';

import './DashboardChooser.css';

const DashboardChooser = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { dispatch, state } = useAuth();
    if (!isOpen) return null;

    const handleChoice = (route) => {
        dispatch({ type: AUTH_ACTIONS.SET_SELECTED_PAGE, payload: route.split('/').pop() });
        navigate(route);
        onClose();
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>Choose Your Dashboard</h2>
                <p>Select which dashboard you would like to access:</p>
                <div className='dashboard-options'>
                    <button
                        className={
                            state.selectedPage === PAGE_TYPES.PAGE_REPORT
                                ? 'dashboard-option-btn primary selected'
                                : 'dashboard-option-btn primary'
                        }
                        onClick={() => handleChoice(`/${PAGE_TYPES.PAGE_REPORT}`)}
                    >
                        <div className='option-icon'>📊</div>
                        <div className='option-text'>
                            <h3>Page Report</h3>
                            <p>View report and update its content while hiding or showing specific attributes</p>
                        </div>
                    </button>
                    <button
                        className={
                            state.selectedPage === PAGE_TYPES.DASHBOARD
                                ? 'dashboard-option-btn primary selected'
                                : 'dashboard-option-btn primary'
                        }
                        onClick={() => handleChoice(`/${PAGE_TYPES.DASHBOARD}`)}
                    >
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
