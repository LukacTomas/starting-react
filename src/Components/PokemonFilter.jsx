import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import PokemonContext from "../PokemonContext";

const PokemonFilter = () => {
  const { filter, setFilter } = useContext(PokemonContext);
  return (
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
};

export default PokemonFilter;
