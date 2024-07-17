import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { pageRoutes } from './routes';
import Headeronly from './Admin/component/layout/headeronly/Headeronly';
import { Fragment } from 'react';
import DefaultLayout from './Admin/component/layout/defaultlayout/DefaultLayout';
import HearderAndFooter from './User/Layout/HeaderAndFooter/Index';
import Gototop from './Component/GoToTop/Index';
// import HostLine from './Component/HostLine/Index';
// import Chat from './Component/Chat/Index';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { authUser } from './redux/selectors';

function App() {
    const user = useSelector(authUser);
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
                                            {item.requireAuth && !user ? (
                                                <Navigate to="/login" />
                                            ) : item.path.startsWith('/admin') &&
                                              !user.roles.includes('ADMIN') &&
                                              !user.roles.includes('TEACHER') ? (
                                                <Navigate to="/" />
                                            ) : (
                                                <item.Component />
                                            )}
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
