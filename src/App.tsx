import { useEffect } from 'react';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import api from './dummy-data/dummy-api';
import { Card, Currency, Wallet } from './dummy-data/types';
import './styles/app.scss';
import PageNotFound from './views/page-not-found';


function AppContent() {
    return (
        <div className="dashboard-content">
            <Outlet />
        </div>
    );
}

function App() {
    // get initial data
    const getInitialData = async () => {
        Promise.all([
            api.read<Currency>('currencies'),
            api.read<Card>('cards'),
            api.read<Wallet>('wallets')
        ])
        .then((response) => {
            const [currencies, cards, wallets] = response;

            console.log(currencies, cards, wallets);
        })
    };

    useEffect(() => {
        getInitialData();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-sidebar">
                <Link to="/me">AAA</Link>
                <Link to="/transactions">BBB</Link>
            </div>

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
                        element={<div>aaa</div>}
                    />
                    <Route
                        path="/transactions"
                        element={<div>bbb</div>}
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
