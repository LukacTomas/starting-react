import React from "react";
import { useSelector } from "react-redux";
import PokemonInfo from "./PokemonInfo";

const PokemonSelected = () => {
  const state = useSelector((state) => state);
  return <>{state.selectedItem && <PokemonInfo />}</>;
};

export default PokemonSelected;
