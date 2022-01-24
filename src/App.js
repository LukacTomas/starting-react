import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      {" "}
      <Button
        color="primary"
        variant="contained"
        onClick={() => onSelect(pokemon)}
      >
        Select
      </Button>
    </td>
  </tr>
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
  <div>
    <h2>{name.english}</h2>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <Button color="secondary" variant="outlined" onClick={onClose}>
      Close
    </Button>
  </div>
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

const Title = styled.h1`
  text-align: center;
  color: navy;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const TextInput = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  min-width: 64px;
  height: 36px;
  vertical-align: middle;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-family: var(
    --pure-material-font,
    "Roboto",
    "Segoe UI",
    BlinkMacSystemFont,
    system-ui,
    -apple-system
  );
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s;
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
      <Container>
        <Title>Pokemon search</Title>
        <TextInput
          type="text"
          value={this.state.filter}
          onChange={({ target }) => this.setFilter(target.value.toLowerCase())}
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
              </tbody>
            </table>
          </div>
          <div>
            {this.state.selectedItem && (
              <PokemonInfo
                {...this.state.selectedItem}
                onClose={() => this.setSelectedItem(null)}
              />
            )}
          </div>
        </TwoColumnLayout>
      </Container>
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
