import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

import PokemonRow from "./PokemonRow";
import PokemonInfo from "./PokemonInfo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemons: [],
      selectedItem: null,
    };
  }

  setPokemons(pokemons) {
    this.setState({
      ...this.state,
      pokemons,
    });
  }

  setFilter(aString) {
    this.setState({
      ...this.state,
      filter: aString,
    });
  }

  setSelectedItem(selectedItem) {
    this.setState({
      ...this.state,
      selectedItem,
    });
  }

  componentDidMount() {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((r) => r.json())
      .then((pokemons) => this.setPokemons(pokemons));
  }

  render() {
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
        <TextField
          label="Filter pokemons"
          variant="filled"
          value={this.state.filter}
          style={{
            width: "100%",
          }}
          onChange={({ target }) => this.setFilter(target.value.toLowerCase())}
        />
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
                {this.state.pokemons
                  .filter(({ name }) =>
                    name.english.toLowerCase().includes(this.state.filter)
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      key={pokemon.id}
                      pokemon={pokemon}
                      onSelect={(pokemon) => this.setSelectedItem(pokemon)}
                    />
                  ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item sm={12} md={4}>
            {this.state.selectedItem && (
              <PokemonInfo
                {...this.state.selectedItem}
                onClose={() => this.setSelectedItem(null)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function App2() {
  const [filter, setFilter] = React.useState("");
  const [selectedItem, selectItemSet] = React.useState(null);
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((r) => r.json())
      .then((p) => setPokemons(p));
  }, []);

  return (
    <Container>
      <Title>Pokemon search</Title>
      <TextInput
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value.toLowerCase())}
      />
      <TwoColumnLayout>
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemons
                .filter(({ name }) =>
                  name.english.toLowerCase().includes(filter)
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    key={pokemon.id}
                    pokemon={pokemon}
                    onSelect={(pokemon) => selectItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div>
          {selectedItem && (
            <PokemonInfo
              {...selectedItem}
              onClose={() => selectItemSet(null)}
            />
          )}
        </div>
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
