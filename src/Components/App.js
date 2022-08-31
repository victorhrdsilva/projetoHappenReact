import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from '../styled/globalStyles';
import PrivatePage from "./PrivatePage";
import LoginPage from './LoginPage';
import Habits from './Habits';
import RegisterPage from './RegisterPage';
import UserContext from '../contexts/UserContext';

export default function App() {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{ loading, setLoading }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />}></Route>
                        <Route path='/register' element={<RegisterPage />}></Route>
                        <Route
                            path="/habits"
                            element={
                                <PrivatePage>
                                    <Habits />
                                </PrivatePage>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}