import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // 确保你有一个App.css文件来包含全局样式

import Login from './Login'; // 主页组件
import Publish from './Publish'; // 关于页面组件
import Delete from './Delete'; // 联系方式页面组件
import NavigationBar from './NavigationBar'; // 导航栏组件

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/publish" element={<Publish />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
