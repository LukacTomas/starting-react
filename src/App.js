import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  Button,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";

const PokemonRow = ({ pokemon, onSelect }) => (
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

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    type: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
  }),
  onSelect: PropTypes.func,
};

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

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

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
