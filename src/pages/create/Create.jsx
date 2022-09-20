import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';

// Styles
import './Create.css';

export default function Create() {
  const [name, setName] = useState('');
  const [steps, setSteps] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();
  const { mode, color } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = { name, ingredients, steps };

    try {
      await projectFirestore.collection('recipes').add(doc);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
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
    <div className={`create ${mode}`}>
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
            <button
              className="btn"
              style={{ backgroundColor: color }}
              onClick={handleAdd}
            >
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
            onChange={(e) => setSteps(e.target.value)}
            value={steps}
            required
          />
        </label>

        <button className="btn" style={{ backgroundColor: color }}>
          submit
        </button>
      </form>
    </div>
  );
}
