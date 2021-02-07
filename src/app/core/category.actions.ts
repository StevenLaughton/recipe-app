import { createAction, createReducer, on } from "@ngrx/store";

export const getCategories = createAction("[Categories] Get");

export const blankCategories = [];

// const categoriesReducer = createReducer(
//     blankCategories,
//     on(getCategories, state => {
//         state.
//     })
// )
