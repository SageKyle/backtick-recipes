import { Link } from 'react-router-dom';

// Styles
import './RecipeList.css';

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.name}</h3>
          <div>{recipe.steps.substring(0, 80)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
