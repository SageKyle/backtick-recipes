import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import { projectFirestore } from '../../firebase/config';

// Styles
import './Search.css';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = 'http://localhost:3000/recipes?q=' + query;

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          setError('There is no recipe to show');
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push(doc.data()['name']);
          });
          setData(results);
          console.log(data);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {<div>{data.toString()}</div>}
    </div>
  );
}
