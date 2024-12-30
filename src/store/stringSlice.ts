import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CategoryState =
  | 0
  | 1
  | 2
  | 3

export type SubCategoryState =
  | 0
  | 1
  | 2

interface CategorySliceState {
  category: CategoryState;
  subcategory: SubCategoryState;
}

const initialState: CategorySliceState = {
  category: 0,
  subcategory: 0
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CategoryState>) {
      state.category = action.payload;
    },
    setSubCategory(state, action: PayloadAction<SubCategoryState>) {
      state.subcategory = action.payload;
    },
  },
});

export const { setSubCategory } = categorySlice.actions;
export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
