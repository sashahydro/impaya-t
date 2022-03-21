import { NavLink } from 'react-router-dom';
import {
    faHouseChimney,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import UiIcon from '../ui/ui-icon';
import './dashboard-sidebar.scss';

export default function DashboardSidebar() {
    return (
        <div className="dashboard-sidebar">
            <NavLink className="sidebar-link" to="/me">
                <UiIcon icon={faHouseChimney} />
            </NavLink>
            <NavLink className="sidebar-link" to="/transactions">
                <UiIcon icon={faCreditCard} />
            </NavLink>
        </div>
    );
}
