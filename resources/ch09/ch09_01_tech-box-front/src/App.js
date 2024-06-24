import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // 确保你有一个App.css文件来包含全局样式

import Home from './Home'; // 主页组件
import About from './About'; // 关于页面组件
import Contact from './Contact'; // 联系方式页面组件
import NavigationBar from './NavigationBar'; // 导航栏组件

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

