import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

// Styles
import './Navbar.css';

// components
import Searchbar from './Searchbar';

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Backtick Recipes</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipes</Link>
      </nav>
    </div>
  );
}
