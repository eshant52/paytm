import { atom, selector } from "recoil";

export const authAtom = atom({
  key: "auth",
  default: localStorage.getItem("token"),
});

export const authValidate = selector({
  key: "authValidate",
  get: ({ get }) => {
    const token = get(authAtom);
    return token
      ? { token: token, isAuth: true }
      : { token: null, isAuth: false };
  },
});
