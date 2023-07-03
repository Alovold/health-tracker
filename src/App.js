import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { HomePage, RecipePage } from './pages';
import './App.css';
import M from 'materialize-css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
      <nav className='NavBar'>
        <ul>
          <li>
            <NavLink to="/">Home</ NavLink>
          </li>

        </ul>
      </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
