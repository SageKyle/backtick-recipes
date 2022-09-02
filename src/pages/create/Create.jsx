import { useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

// Styles
import './Create.css';

export default function Create() {
  const [name, setName] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { postData, data, error } = useFetch(
    'http://localhost:3000/recipes',
    'POST'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, cookingSteps, ingredients);
    postData({ name, ingredients, cookingSteps });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }

    setNewIngredient('');
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Name:</span>
          <input
            type="text"
            placeholder="Name of recipe"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:{' '}
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>

        <label>
          <span>Cooking Steps:</span>
          <textarea
            onChange={(e) => setCookingSteps(e.target.value)}
            value={cookingSteps}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
