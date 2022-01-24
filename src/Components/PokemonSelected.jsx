import React, { useContext } from "react";
import PokemonContext from "../PokemonContext";
import PokemonInfo from "./PokemonInfo";

const PokemonSelected = () => {
  const { state } = useContext(PokemonContext);
  return <>{state.selectedItem && <PokemonInfo />}</>;
};

export default PokemonSelected;
