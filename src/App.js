import React from "react";
import "./app.scss";

const Header = () => {
  return (
    <div className="header">
      <h1>Pokereact</h1>
    </div>
  );
};

const Pokemon = ({ pokemon, handleAttak }) => {
  return (
    <div className="pokemon">
      <div className="pokemon__image">
        <img src={pokemon.imgUrl} alt="pokemon-1" />
      </div>
      <div className="pokemon__name">{pokemon.name}</div>
      <div className="pokemon__stats">
        <span>Niv : {pokemon.lvl}</span>
        <span>
          PV : {pokemon.pv.current} / {pokemon.pv.max}
        </span>
        {pokemon.status && (
          <div className="pokemon__status">{pokemon.status}</div>
        )}
      </div>
      <div className="pokemon__attaks">
        {pokemon.attaks.map((attak, index) => (
          <button
            key={`${attak.name}-${index}`}
            onClick={() => handleAttak(attak, pokemon.id)}
            className="pokemon__attak"
          >
            <span>{attak.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [pokemons, setPokemons] = React.useState([
    {
      id: 1,
      name: "Pikachu",
      imgUrl: "./img/pokemon/pikachu.png",
      lvl: "12",
      pv: {
        max: 41,
        current: 41,
      },
      status: null,
      attaks: [
        {
          name: "Charge",
          power: "30",
          type: "normal",
        },
        {
          name: "Eclair",
          power: "40",
          type: "electric",
        },
      ],
      stats: {
        attak: 18,
        defense: 11,
      },
    },
    {
      id: 2,
      name: "Roucoul",
      imgUrl: "./img/pokemon/roucoul.png",
      lvl: "14",
      pv: {
        max: 43,
        current: 43,
      },
      status: null,
      attaks: [
        {
          name: "Charge",
          power: "30",
          type: "normal",
        },
        {
          name: "Tornade",
          power: "40",
          type: "vol",
        },
      ],
      stats: {
        attak: 17,
        defense: 12,
      },
    },
  ]);

  const handleAttak = (attak, id) => {
    const pokemonLauncher = pokemons.find((pokemon) => pokemon.id === id);
    let pokemonReceiver = pokemons.find((pokemon) => pokemon.id !== id);
    const random = Math.random() * (1 - 0.85) + 0.85;

    const dammage = Math.floor(
      (attak.power *
        (pokemonLauncher.stats.attak / 10) *
        (pokemonLauncher.lvl / 5) *
        random) /
        (pokemonReceiver.lvl / 5 + pokemonReceiver.stats.defense)
    );

    pokemonReceiver.pv.current = String(
      pokemonReceiver.pv.current - (dammage < 1 ? 1 : dammage)
    );

    setPokemons([...pokemons, pokemonReceiver]);
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header />
        <div className="game-container">
          <Pokemon pokemon={pokemons[0]} handleAttak={handleAttak} />
          <Pokemon pokemon={pokemons[1]} handleAttak={handleAttak} />
        </div>
      </div>
    </div>
  );
};

export default App;
