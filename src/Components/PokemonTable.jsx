import React from "react";
import PokemonRow from "./PokemonRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

let renderTableCount = 0;

const PokemonTable = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log({ renderTableCount: renderTableCount++ });

  return (
    <Table width="100%">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Selection</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pokemons
          .filter(({ name }) => name.english.toLowerCase().includes(filter))
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={(pokemon) =>
                dispatch({
                  type: "SET_SELECTED_POKEMON",
                  payload: pokemon,
                })
              }
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default PokemonTable;
