import React from "react";
import { TextField } from "@material-ui/core";

const PokemonFilter = ({ filter, setFilter }) => (
  <TextField
    label="Filter pokemons"
    variant="filled"
    value={filter}
    style={{
      width: "100%",
    }}
    onChange={({ target }) => setFilter(target.value.toLowerCase())}
  />
);

export default PokemonFilter;
