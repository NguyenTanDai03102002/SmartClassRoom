import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { pageRoutes } from './routes';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { authUser } from './redux/selectors';
import Headeronly from './Admin/component/layout/headeronly/Headeronly';
import DefaultLayout from './Admin/component/layout/defaultlayout/DefaultLayout';
import HearderAndFooter from './User/Layout/HeaderAndFooter/Index';
import Gototop from './Component/GoToTop/Index';
// import HostLine from './Component/HostLine/Index';
// import Chat from './Component/Chat/Index';

function App() {
    const RequireAuth = ({ children, requireAuth }) => {
        const user = useSelector(authUser);
        const location = useLocation();
        if (requireAuth && !user) {
            return <Navigate to="/login" state={{ from: location.pathname }} />;
        }
        return children;
    };

    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        {pageRoutes.map((item, index) => {
                            let Layout;

                            if (item.layout === DefaultLayout) {
                                Layout = item.layout;
                            } else if (item.layout === Headeronly) {
                                Layout = item.layout;
                            } else if (item.layout === null) {
                                Layout = Fragment;
                            } else if (item.layout === HearderAndFooter) {
                                Layout = item.layout;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <Layout>
                                            <RequireAuth requireAuth={item.requireAuth}>
                                                <item.Component />
                                            </RequireAuth>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
            {/* {window.location.pathname.startsWith('/admin') || window.location.pathname === '/login' ? null : (
                <>
                    <Chat />
                    <HostLine />
                </> 
            )} */}
            <Gototop />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
