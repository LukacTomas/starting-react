import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import PokemonContext from "../PokemonContext";

const PokemonFilter = () => {
  const { state, dispach } = useContext(PokemonContext);
  return (
    <TextField
      label="Filter pokemons"
      variant="filled"
      value={state.filter}
      style={{
        width: "100%",
      }}
      onChange={({ target }) =>
        dispach({
          type: "SET_FILTER",
          payload: target.value.toLocaleLowerCase(),
        })
      }
    />
  );
};

export default PokemonFilter;
