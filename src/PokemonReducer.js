const initialState = {
  pokemon: [],
  filter: "",
  selectedItem: null,
};
const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "SET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedItem: action.payload,
      };

    default:
      return state;
  }
};

const selectedPokemon = (state) => state.selectedItem;
export { selectedPokemon };

export default pokemonReducer;
