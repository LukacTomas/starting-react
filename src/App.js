import React, { useState } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";

import PokemonFilter from "./Components/PokemonFilter";
import PokemonTable from "./Components/PokemonTable";
import PokemonSelected from "./Components/PokemonSelected";
import PokemonHeading from "./Components/PokemonHeading";

import PokemonContext from "./PokemonContext";

function App() {
  const [filter, setFilter] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((r) => r.json())
      .then((pokemons) => setPokemons(pokemons));
  }, []);

  if (!pokemons || pokemons.length === 0) {
    return <>Loading....</>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: 800,
        margin: "auto",
      }}
    >
      <PokemonContext.Provider
        value={{
          filter,
          setFilter,
          selectedItem,
          setSelectedItem,
          pokemons,
          setPokemons,
        }}
      >
        <PokemonHeading />
        <PokemonFilter />
        <Grid container spacing={2}>
          <Grid item sm={12} md={8}>
            <PokemonTable />
          </Grid>
          <Grid item sm={12} md={4}>
            <PokemonSelected />
          </Grid>
        </Grid>
      </PokemonContext.Provider>
    </Grid>
  );
}

export default App;
