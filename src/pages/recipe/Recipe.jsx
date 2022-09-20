import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
// import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

// Styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection('recipes')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError('Unable to fetch the recipe');
        }
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading Recipe</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <motion.div
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: '70',
            delay: 0.2,
          }}
        >
          <h2 className="page-title">{recipe.name}</h2>
          <h5>Ingredients</h5>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h5>Cooking Steps</h5>
          <p>{recipe.steps}</p>
        </motion.div>
      )}
    </div>
  );
}
