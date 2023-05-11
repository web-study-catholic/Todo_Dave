import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const loading = <div>화면을 불러오는 중 입니다.</div>;

// 추후에 기능이 고도화되면 라우팅하여 여러개의 페이지를 관리

const Home = React.lazy(() => import("./pages/Home"));
const Home2 = React.lazy(() => import("./pages/Home2"));



const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={loading}>
                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Home2" element={<Home2 />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default App;
