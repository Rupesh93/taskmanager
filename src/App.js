import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/login';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <div>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<PrivateRoutes Component={Dashboard} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
