import { atom } from "recoil";
import { localPersistEffect } from "./effects";
import { Voter } from "@/types/voter";

export const userState = atom<Voter | null>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [localPersistEffect],
});
