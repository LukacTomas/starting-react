const pokemonReducer = (state, action) => {
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
      throw new Error("No action");
  }
};

export default pokemonReducer;
