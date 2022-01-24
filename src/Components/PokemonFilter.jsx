import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const PokemonFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <TextField
      label="Filter pokemons"
      variant="filled"
      value={filter}
      style={{
        width: "100%",
      }}
      onChange={({ target }) =>
        dispatch({
          type: "SET_FILTER",
          payload: target.value.toLocaleLowerCase(),
        })
      }
    />
  );
};

export default PokemonFilter;
