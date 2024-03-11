import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LogIn, Page404 } from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
