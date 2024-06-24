import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Publish from './Publish';
import Delete from './Delete';
import NavigationBar from './NavigationBar';

// 创建一个新组件来包含路由和导航栏逻辑
const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <NavigationBar />}
      <Routes>
        <Route path="/publish" element={<Publish />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Layout />
      </div>
    </Router>
  );
};

export default App;

