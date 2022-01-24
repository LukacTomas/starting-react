import React, { useContext } from "react";
import PokemonRow from "./PokemonRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PokemonContext from "../PokemonContext";

const PokemonTable = () => {
  const { state, dispach } = useContext(PokemonContext);

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
        {state.pokemons
          .filter(({ name }) =>
            name.english.toLowerCase().includes(state.filter)
          )
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={(pokemon) =>
                dispach({
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
