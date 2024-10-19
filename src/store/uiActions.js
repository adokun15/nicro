import { createSlice } from "@reduxjs/toolkit";
export const UiSlice = createSlice({
  name: "Ui",
  initialState: {
    modalToggle: false,
    modalEdit: false,
    modalDelete: false,
    modalAuth: false,
    currentItem: {},
    notifier: { display: false, message: "", type: "" },
  },
  reducers: {
    updateModalToggle(s, a) {
      s.modalToggle = a.payload;
    },
    updateModalAuth(s, a) {
      s.modalAuth = a.payload;
    },
    updateModalEdit(s, a) {
      s.modalEdit = a.payload.bool;
      s.currentItem = { ...a.payload.items };
    },
    updateModalDelete(s, a) {
      s.modalDelete = a.payload.bool;
      s.currentItem = { ...a.payload.items };
    },
    notifierHandler(s, a) {
      s.notifier = { ...a.payload };
    },
  },
});
export const UiActions = UiSlice.actions;
