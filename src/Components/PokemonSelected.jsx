import React, { useContext } from "react";
import PokemonContext from "../PokemonContext";
import PokemonInfo from "./PokemonInfo";

const PokemonSelected = () => {
  const { selectedItem } = useContext(PokemonContext);
  return <>{selectedItem && <PokemonInfo />}</>;
};

export default PokemonSelected;
