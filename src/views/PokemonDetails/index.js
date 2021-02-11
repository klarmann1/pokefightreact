import React, { useState, useEffect } from 'react';
import PokemonDetailed from '../../components/PokemonDetailed';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SinglePokemon() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(`https://wbsgroup4pokefight.herokuapp.com/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PokemonDetailed
        id={pokemon[0].id}
        name={pokemon[0].name.english}
        base={pokemon[0].base}
        type={pokemon[0].type}
      />
    </div>
  );
}