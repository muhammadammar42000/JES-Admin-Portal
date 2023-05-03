import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "saveIds",
  initialState: {
    LocationId: null,
    locationCategoryId: null,
    activityLocationId: null,
    activityCategoryIdValue: null,
    eventLocationId: null,
  },
  reducers: {
    setReduxLocationId: (state, action) => {
      state.LocationId = action.payload;
    },
    setReduxLocationCategoryId: (state, action) => {
      state.locationCategoryId = action.payload;
    },
    setReduxActivityLocationId: (state, action) => {
      state.activityLocationId = action.payload;
    },
    setReduxActivityCategoryId: (state, action) => {
      state.activityCategoryIdValue = action.payload;
    },
    setEventLocationId: (state, action) => {
      state.eventLocationId = action.payload;
    },
  },
});

export const {
  setReduxLocationId,
  setReduxLocationCategoryId,
  setReduxActivityLocationId,
  setReduxActivityCategoryId,
  setEventLocationId,
} = slice.actions;

export default slice.reducer;
