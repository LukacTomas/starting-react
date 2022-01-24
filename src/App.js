import React, { useReducer, useState } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";

import PokemonFilter from "./Components/PokemonFilter";
import PokemonTable from "./Components/PokemonTable";
import PokemonSelected from "./Components/PokemonSelected";
import PokemonHeading from "./Components/PokemonHeading";

import store from "./Store";
import { Provider, useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((r) => r.json())
      .then((pokemons) => {
        dispatch({
          type: "SET_POKEMONS",
          payload: pokemons,
        });
      });
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
    </Grid>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
