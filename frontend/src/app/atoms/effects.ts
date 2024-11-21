import { DefaultValue } from "recoil";
import { unStringfy } from "../utils";

interface ITypes {
  onSet: any;
  setSelf: any;
  node: any;
}

export const localPersistEffect = ({ onSet, setSelf, node }: ITypes) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedItems = localStorage.getItem(node.key);

    if (storedItems != null) {
      setSelf(unStringfy(storedItems));
    }

    onSet((newItems: any) => {
      if (newItems instanceof DefaultValue) {
        localStorage.removeItem(node.key);
      } else {
        localStorage.setItem(node.key, JSON.stringify(newItems));
      }
    });
  }
};
