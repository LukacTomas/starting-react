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
  const { pokemons, filter, setSelectedItem } = useContext(PokemonContext);

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
              onSelect={(pokemon) => setSelectedItem(pokemon)}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default PokemonTable;
