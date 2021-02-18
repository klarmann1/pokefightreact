import './styles.css';
const PokeFighter = ({
  name,
  fighter,
  id,
  url,
  HP,
  fightHP,
  Attack,
  Defense
}) => {
  console.log(fighter);
  console.log('This is Id' + id);
  console.log('This is URL ' + url);

  return (
    <div className="pokeFighter">
      {name}
      <div className="pokeCenter">
        <img src={url} alt="pokefighter" />
        <div className="pokeInfo">
          <p>
            HP: {fightHP}/{HP}
          </p>
          <p>Attack: {Attack}</p>
          <p>Defense: {Defense}</p>
        </div>
      </div>
    </div>
  );
};

export default PokeFighter;
