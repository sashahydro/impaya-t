import { useEffect, useState } from 'react';
import {
    Navigate,
    Outlet,
    Route,
    Routes
} from 'react-router-dom';
import { getCards } from './store/features/cards';
import { getCurrencies } from './store/features/currencies';
import { getWallets } from './store/features/wallets';
import { useDispatch } from './store/hooks';
import DashboardSidebar from './views/dashboard-sidebar';
import PageNotFound from './views/page-not-found';
import './styles/app.scss';
import HomeView from './views/home-view';
import TransactionsView from './views/transactions-view';




function App() {
    const dispatch = useDispatch();

    const [isLoaded, setLoadedState] = useState(false);
    const [initError, setLoadingError] = useState<null | Error>(null);

    // get initial data
    useEffect(() => {
        const getInitialData = () => {
            Promise.all([
                dispatch(getCurrencies()),
                dispatch(getCards()),
                dispatch(getWallets())
            ])
                .catch((e) => {
                    // critical data error
                    setLoadingError(e);
                })
                .finally(() => {
                    setLoadedState(true);
                });
        };

        if (!isLoaded) {
            getInitialData();
        }
    }, [isLoaded, dispatch]);



    const AppContent = () => {
        const _renderContent = () => {
            if (!isLoaded) {
                return (
                    <div>{/* your fancy prealoder here */}</div>
                )
            }

            if (initError === null) {
                return (<Outlet />);
            }

            return (
                <div className="alert alert-danger">
                    Ошибка при загрузке приложения: {initError.message}
                </div>
            );
        };

        return (
            <div className="dashboard-content">
                <div className="container dashboard-pt">
                    {_renderContent()}
                </div>
            </div>
        );
    };



    return (
        <div className="dashboard">
            <DashboardSidebar />

            <Routes>
                <Route
                    path="/"
                    element={<AppContent />}>
                    <Route
                        index
                        element={<Navigate to="/me" />}
                    />
                    <Route
                        path="/me"
                        element={<HomeView />}
                    />
                    <Route
                        path="/transactions"
                        element={<TransactionsView /> }
                    />
                    <Route
                        path="/*"
                        element={<PageNotFound />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
