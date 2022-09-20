import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import deleteIcon from '../assets/delete-icon.svg';
import { useTheme } from '../hooks/useTheme';

// Styles
import { projectFirestore } from '../firebase/config';
import './RecipeList.css';

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          className={`card ${mode}`}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: '300',
            delay: recipe.id / 7,
          }}
          whileHover={{ translateY: -10, scale: 1.05 }}
        >
          <h3 className="title">{recipe.name}</h3>
          <div className="recipe-steps">{recipe.steps.substring(0, 80)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <motion.img
            src={deleteIcon}
            alt="delete recipe"
            className="delete"
            onClick={() => handleClick(recipe.id)}
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
