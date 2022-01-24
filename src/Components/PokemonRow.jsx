import React from "react";
import { Button, TableCell, TableRow } from "@material-ui/core";

import PropTypes from "prop-types";
import PokemonContext from "../PokemonContext";

const PokemonRow = ({ pokemon, onSelect }) => {
  return (
    <TableRow>
      <TableCell>{pokemon.name.english}</TableCell>
      <TableCell>{pokemon.type.join(", ")}</TableCell>
      <TableCell>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSelect(pokemon)}
        >
          Select
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PokemonRow;

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    type: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
  }),
  onSelect: PropTypes.func,
};
