import React, { useState } from "react";
import "./App.css";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import PokemonRow from "./Components/PokemonRow";
import PokemonInfo from "./Components/PokemonInfo";
import PokemonFilter from "./Components/PokemonFilter";

function App() {
  const [filter, setFilter] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((r) => r.json())
      .then((pokemons) => setPokemons(pokemons));
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: 800,
        margin: "auto",
      }}
    >
      <Typography color="primary" variant="h1" align="center">
        Pokemon search
      </Typography>
      <PokemonFilter filter={filter} setFilter={setFilter} />
      <Grid container spacing={2}>
        <Grid item sm={12} md={8}>
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
                .filter(({ name }) =>
                  name.english.toLowerCase().includes(filter)
                )
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
        </Grid>
        <Grid item sm={12} md={4}>
          {selectedItem && (
            <PokemonInfo
              {...selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
