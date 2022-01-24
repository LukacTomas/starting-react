import { createStore } from "redux";
import pokemonReducer from "./PokemonReducer";

const store = createStore(pokemonReducer);

export default store;