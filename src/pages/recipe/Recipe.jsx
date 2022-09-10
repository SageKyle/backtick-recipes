import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

// Styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const { mode } = useTheme();

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading Recipe</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <div>
          <h2 className="page-title">{recipe.name}</h2>
          <h5>Ingredients</h5>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h5>Cooking Steps</h5>
          <p>{recipe.steps}</p>
        </div>
      )}
    </div>
  );
}
