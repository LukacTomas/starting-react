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
import { useDispatch, useSelector } from "react-redux";

import { selectedPokemon } from "../PokemonReducer";

let renderCountInfo = 0;

function objectEquals(x, y) {
  "use strict";

  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) {
    return false;
  }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) {
    return x === y;
  }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false;
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }

  // recursive object equality check
  var p = Object.keys(x);
  return (
    Object.keys(y).every(function (i) {
      return p.indexOf(i) !== -1;
    }) &&
    p.every(function (i) {
      return objectEquals(x[i], y[i]);
    })
  );
}

function infoPropsAreEqual(prevInfo, nextInfo) {
  return (
    prevInfo.english === nextInfo.english &&
    objectEquals(prevInfo.base, nextInfo.base)
  );
}

const Info = React.memo(({ english, base }) => {
  console.log({ renderCountInfo: renderCountInfo++ });
  console.log("rendering");

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
    </>
  );
}, infoPropsAreEqual);

const PokemonInfo = () => {
  const selectedItem = useSelector(selectedPokemon);
  const dispatch = useDispatch();

  const english = React.useMemo(
    () => selectedItem.name.english,
    [selectedItem]
  );

  const base = React.useMemo(() => selectedItem.base, [selectedItem]);

  return (
    <>
      <Info english={english} base={base} />{" "}
      <Button
        color="secondary"
        variant="outlined"
        onClick={() =>
          dispatch({
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
