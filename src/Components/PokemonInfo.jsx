import React, { useContext } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import PropTypes from "prop-types";
import PokemonContext from "../PokemonContext";

const PokemonInfo = () => {
  const {
    state: {
      selectedItem: { english, base },
    },
    dispach,
  } = useContext(PokemonContext);

  return (
    <>
      <Typography variant="h3" color="secondary" align="center">
        {english}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(base).map((key) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{base[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        color="secondary"
        variant="outlined"
        onClick={() =>
          dispach({
            type: "SET_SELECTED_POKEMON",
            payload: null,
          })
        }
      >
        Close
      </Button>
    </>
  );
};

export default PokemonInfo;

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func,
};
