import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";

export const userAtom = atom({
  key: "user",
  default: selector({
    key: "selectorUser",
    get: async () => {
      let res, errRes;
      const url = "http://localhost:3009/api/v1/user";

      try {
        res = await axios.get(url);
      } catch (err) {
        errRes = err;
      }

      return {
        id: res.data.id,
        username: res.data.username,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
      };
    },
  }),
});

export const balanceAtom = atom({
  key: "balance",
  default: selector({
    key: "balanceSelector",
    get: async () => {
      let res, errRes;
      const url = "http://localhost:3009/api/v1/account/balance";

      try {
        res = await axios.get(url);
      } catch (err) {
        errRes = err;
      }

      return res.data.balance;
    },
  }),
});

export const userSearchQuery1 = atom({
  key: "searchQuery",
  default: selector({
    key: "searchQuerySelector",
    get: async () => {
      let res, errRes;
      const url = "http://localhost:3009/api/v1/user/bulk?filter=Sonune";

      try {
        res = await axios.get(url);
      } catch (err) {
        errRes = err;
      }

      return res.data.users;
    },
  }),
});

export const userSearchQuery = selectorFamily({
  key: "userSearchQuery",
  get: (query) => async () => {
    if (query.trim() !== '') {
      let res, errRes;
      const url = `http://localhost:3009/api/v1/user/bulk?filter=${query}`;
  
      try {
        res = await axios.get(url);
      } catch (err) {
        errRes = err;
      }
    
      return res.data.users;
    }
    else {
      return [];
    }
  },
});
