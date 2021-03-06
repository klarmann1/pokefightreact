import React, { useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import PokemonDetails from '../PokemonDetails';
import PokemonList from '../../components/PokemonList';
import PokeFighter from '../../components/PokeFighter';
import HallOfFame from '../../components/HallOfFame';
import './styles.css';
import axios from 'axios';

export default function AllPokemon({ allPokemon, isLoading }) {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [viewHall, setViewHall] = useState(false);
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  let [pokemon1, setPokemon1] = useState();
  let [pokemon2, setPokemon2] = useState();
  let [pokemon1HP, setPokemon1HP] = useState();
  let [pokemon1D, setPokemon1D] = useState();
  const [pokemon1Run, setPokemon1Run] = useState(true);
  let [pokemon2HP, setPokemon2HP] = useState();
  let [pokemon2D, setPokemon2D] = useState();
  const [pokemon2Run, setPokemon2Run] = useState(true);
  const [turn1, setTurn1] = useState(true);
  const [turn2, setTurn2] = useState(false);
  const [turnStyle1, setTurnStyle1] = useState('');
  const [turnStyle2, setTurnStyle2] = useState('');
  const [winner, setWinner] = useState();

  const selectSwitch1 = () => {
    select1 ? setSelect1(false) : setSelect1(true);
  };
  const selectSwitch2 = () => {
    select1 ? setSelect2(false) : setSelect2(true);
  };

  const choose1 = fighterId => {
    setFighter1(fighterId);
    setSelect1(false);
    setPokemon1({
      name: allPokemon[fighterId].name.english,
      id: allPokemon[fighterId].id,
      url: allPokemon[fighterId].spriteback,
      HP: allPokemon[fighterId].base.HP,
      Attack: allPokemon[fighterId].base.Attack,
      Defense: allPokemon[fighterId].base.Defense,
      Speed: allPokemon[fighterId].base.Speed
    });
    setPokemon1HP(allPokemon[fighterId].base.HP);
    setPokemon1D(allPokemon[fighterId].base.Defense);
    setTurn1(true);
    setTurnStyle1('1px solid white');
  };
  const choose2 = fighterId => {
    setFighter2(fighterId);
    setSelect2(false);
    setPokemon2({
      name: allPokemon[fighterId].name.english,
      id: allPokemon[fighterId].id,
      url: allPokemon[fighterId].spritefront,
      HP: allPokemon[fighterId].base.HP,
      Attack: allPokemon[fighterId].base.Attack,
      Defense: allPokemon[fighterId].base.Defense,
      Speed: allPokemon[fighterId].base.Speed
    });
    setPokemon2HP(allPokemon[fighterId].base.HP);
    setPokemon2D(allPokemon[fighterId].base.Defense);
  };
  const fightEnd = () => {
    setFighter1(null);
    setFighter2(null);
    setPokemon1(null);
    setPokemon2(null);
    setTurn1(false);
    setTurn2(false);
    // setViewHall(true);
    setTurnStyle1('');
    setTurnStyle2('');
    setWinner();
  };
  //post winner in db
  const postResult = async winnerId => {
    const result = {
      pokemon1: pokemon1.id,
      pokemon2: pokemon2.id,
      winner: winnerId
    };
    const res = await axios.post(
      'https://wbsgroup4pokefight.herokuapp.com/pokemon/fight/create',
      result
    );
    const data = res.data;
  };

  const attack1 = () => {
    let hp = pokemon2HP - Math.floor(pokemon1.Attack * (Math.random() * 1));
    setPokemon2HP(hp);
    setTurn1(false);
    setTurnStyle1('');
    setTurnStyle2('3px solid red');
    setTurn2(true);
    if (hp <= 0) {
      postResult(pokemon1.id);
      setWinner(pokemon1);
    }
  };
  const attack2 = () => {
    let hp = pokemon1HP - Math.floor(pokemon2.Attack * (Math.random() * 1));
    setPokemon1HP(hp);
    setTurn1(true);
    setTurnStyle2('');
    setTurnStyle1('3px solid white');
    setTurn2(false);
    if (hp <= 0) {
      postResult(pokemon2.id);
      setWinner(pokemon2);
    }
  };
  const defend1 = () => {
    let hp = pokemon1HP + Math.floor(pokemon1D * 0.5);
    setPokemon1HP(hp);
    setPokemon1D(pokemon1D => Math.floor(pokemon1D * 0.5));
    setTurn1(false);
    setTurn2(true);
    setTurnStyle1('');
    setTurnStyle2('3px solid red');
  };
  const defend2 = () => {
    let hp = pokemon2HP + Math.floor(pokemon2D * 0.5);
    setPokemon2HP(hp);
    setPokemon2D(pokemon2D => Math.floor(pokemon2D * 0.5));
    setTurn1(true);
    setTurn2(false);
    setTurnStyle2('');
    setTurnStyle1('3px solid white');
  };
  const run1 = () => {
    console.log(pokemon1.Speed, pokemon2.Speed);
    if (pokemon1.Speed > pokemon2.Speed) {
      setFighter1(null);
      setFighter2(null);
      setTurnStyle2('');
      setTurnStyle1('');
      fightEnd();
      alert('run successfull');
    } else {
      setTurn1(false);
      setTurn2(true);
      setTurnStyle1('');
      setTurnStyle2('3px solid red');
      setPokemon1Run(false);
      alert('Your run failed. Prepare to die!');
    }
  };
  const run2 = () => {
    console.log(pokemon2.Speed, pokemon1.Speed);
    if (pokemon2.Speed > pokemon1.Speed) {
      setFighter1(null);
      setFighter2(null);
      setTurnStyle2('');
      setTurnStyle1('');
      fightEnd();
      alert('run successfull');
    } else {
      setTurn1(true);
      setTurn2(false);
      setTurnStyle1('3px solid white');
      setTurnStyle2('');
      setPokemon2Run(false);
      alert('Your run failed. Prepare to die!');
    }
  };
  if (isLoading) {
    return (
      <div className="isLoading">
        <span>LOADING POKEMON</span>
      </div>
    );
  }

  return (
    <div>
      <header>
        <img
          className="logo"
          src="https://fontmeme.com/permalink/210213/0c674bf6450b9b8545003e3d26a223a8.png"
        />
      </header>

      <div className="fightContainer">
        {fighter1 !== null && !winner ? (
          <div className="fighter1" style={{ borderBottom: `${turnStyle1}` }}>
            <PokeFighter
              name={pokemon1.name}
              fighter={pokemon1}
              id={pokemon1.id}
              url={pokemon1.url}
              HP={pokemon1.HP}
              fightHP={pokemon1HP}
              Attack={pokemon1.Attack}
              Defense={pokemon1D}
              Speed={pokemon1.Speed}
            />
          </div>
        ) : null}
        {fighter1 === null ? (
          <p className="choose" onClick={() => selectSwitch1()}>
            Click To Choose Pokemon 1
          </p>
        ) : null}
        <div className="versus">
          {!winner && pokemon1 && pokemon2 ? (
            <p className="versus-vs">VS</p>
          ) : null}
          {turn1 && pokemon1 && pokemon2 && !winner ? (
            <div className="fightButtons fightButtons1">
              <button onClick={() => attack1()}>Attack</button>
              <button onClick={() => defend1()}>Defend</button>
              {pokemon1Run ? (
                <button onClick={() => run1()}>Run</button>
              ) : (
                <button disabled>Run</button>
              )}
              <span>{pokemon1.name}'s turn</span>
            </div>
          ) : null}
          {turn2 && pokemon1 && pokemon2 && !winner ? (
            <div className="fightButtons fightButtons2">
              <button onClick={() => attack2()}>Attack</button>
              <button onClick={() => defend2()}>Defend</button>
              {pokemon2Run ? (
                <button onClick={() => run2()}>Run</button>
              ) : (
                <button disabled>Run</button>
              )}
              <span>{pokemon2.name}'s turn</span>
            </div>
          ) : null}
        </div>
        {winner ? (
          <div className="winner">
            <img src={allPokemon[winner.id - 1].sprite} />
            <h3>{winner.name} WINS!</h3>
            <span className="winner-reset" onClick={() => fightEnd()}>
              --Reset--
            </span>
          </div>
        ) : null}
        {pokemon1 && fighter2 !== null && !winner ? (
          <div className="fighter2" style={{ borderBottom: `${turnStyle2}` }}>
            <PokeFighter
              name={pokemon2.name}
              fighter={pokemon2}
              id={pokemon2.id}
              url={pokemon2.url}
              HP={pokemon2.HP}
              fightHP={pokemon2HP}
              Attack={pokemon2.Attack}
              Defense={pokemon2D}
              Speed={pokemon2.Speed}
            />
          </div>
        ) : null}
        {pokemon1 && !pokemon2 ? (
          <p className="choose" onClick={() => selectSwitch2()}>
            Choose Opponent
          </p>
        ) : null}
      </div>

      <div className="hof-span-div">
        <span className="hof-span" onClick={() => setViewHall(true)}>
          -- Visit the Hall of Fame --
        </span>
      </div>
      <Switch>
        <Route path="/pokemon/:id">
          <PokemonDetails />
        </Route>
      </Switch>
      {viewHall ? (
        <div className="hof" onClick={() => setViewHall(false)}>
          <HallOfFame allPokemon={allPokemon} />
        </div>
      ) : null}
      <PokemonList
        allPokemon={allPokemon}
        choose1={choose1}
        choose2={choose2}
        select1={select1}
        select2={select2}
      />
    </div>
  );
}
