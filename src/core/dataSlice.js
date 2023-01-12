import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../core/store";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
export const dataSlice = createSlice({
  name: "userinfo",
  initialState: {
    wallet: "",
    fname: "",
    inviteEmail: "",
    collection: [],
    biz: "",
    sold: [],
    loading: false,
    hasErrors: false,
    transactions: [],
    loginInfo: [],
    assets: "",
    user: null,
    sales: null,
    bought: null,
    views: null,
    likes:null

  },

  reducers: {
    setbought: (state, action) => {
      state.wallet = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setInviteEmail: (state, action) => {
      state.inviteEmail = action.payload;
    },
    setFname: (state, action) => {
      state.fname = action.payload;
    },
    setBiz: (state, action) => {
      state.biz = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    setSales: (state, action) => {
      state.sales = action.payload;
    },
    setSold: (state, action) => {
      state.sold.push(action.payload);
    },
    setViews: (state, action) => {
      state.views = action.payload;
    },
    setLikes: (state, action) => {
      state.likes = action.payload;
    },

    setCollection: (state, action) => {
      state.collection.push(action.payload);
    },

    setLogInfo: (state, action) => {
      state.loginInfo.push(action.payload);
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    getTransactions: (state) => {
      state.loading = true;
    },
    getTransSuccess: (state, { payload }) => {
      state.transactions = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getTransFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setInviteEmail,
  setCollection,
  setBiz,
  setFname,
  setUser,
  setbought,
  setSales,
  setAssets,
  setWallet,
  setSold,
  getTransFailure,
  getTransSuccess,
  getTransactions,
  setLogInfo,
  setViews,
  setLikes
} = dataSlice.actions;

export default dataSlice.reducer;

// Asynchronous thunk action
export function fetchBought(wallet) {
  return async (dispatch, getState) => {
    dispatch(getTransactions());

    const address = wallet;

    await axios
      .post(`${API_URL}/nfts/bought`, { address })
      .then((response) => {
        dispatch(getTransSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getTransFailure());
      });
  };
}

export function fetchMyAssets(wallet) {
  return async (dispatch) => {
    const owner = wallet;
    await axios
      .post(`${API_URL}/nfts/getmynft`, { owner })
      .then((response) => {
        dispatch(setAssets(response.data));
      })
      .catch((error) => {
        dispatch(setAssets("0"));
      });
  };
}

export function fetchMyViews(wallet) {
  return async (dispatch) => {
    const owner = wallet;
    await axios
      .post(`${API_URL}/api/getmyviews`, { owner })
      .then((response) => {
        dispatch(setViews(response.data));
      })
      .catch((error) => {
        dispatch(setViews([]));
      });
  };
}

export function fetchMyLikes(wallet) {
  return async (dispatch) => {
    const owner = wallet;
    await axios
      .post(`${API_URL}/api/getmylikes`, { owner })
      .then((response) => {
        dispatch(setLikes(response.data));
      })
      .catch((error) => {
        dispatch(setLikes([]));
      });
  };
}
