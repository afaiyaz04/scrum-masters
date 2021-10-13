import { createSelector } from "reselect";

const contractSelector = (state) => {
  if (state) {
    return state.contractState;
  }
};

export const getContracts = createSelector(
  contractSelector,
  (contracts) => contracts
);
