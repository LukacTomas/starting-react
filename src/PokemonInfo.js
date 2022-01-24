import React from "react";
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

const PokemonInfo = ({ name, base, onClose }) => (
  <>
    <Typography variant="h3" color="secondary" align="center">
      {name.english}
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

    <Button color="secondary" variant="outlined" onClick={onClose}>
      Close
    </Button>
  </>
);

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
