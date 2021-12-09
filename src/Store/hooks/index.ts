import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "Store/types";

const useAppDispatch = (): ThunkDispatch<RootState, AppDispatch, AnyAction> => useDispatch();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
