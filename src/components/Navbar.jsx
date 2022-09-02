import { Link } from 'react-router-dom';

// Styles
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Backtick Recipes</h1>
        </Link>
        <Link to="/create">Create Recipes</Link>
      </nav>
    </div>
  );
}
