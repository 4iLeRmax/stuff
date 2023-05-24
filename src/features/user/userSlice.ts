import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProducts, IUser } from '../../types/type';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export type cartItem = {
  quantity: number;
} & IProducts;

type init = {
  cart: cartItem[];
  currentUser: IUser | null;
  isLoading: boolean;
  formType: string;
  showForm: boolean;
};

const initialState: init = {
  currentUser: null,
  cart: [],
  isLoading: false,
  formType: 'signup',
  showForm: false,
};

export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload: { name: string; email: string; password: string; avatar: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });

      return login.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateUser = createAsyncThunk('users/updateUser', async (payload: IUser, thunkAPI) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IProducts>) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === action.payload.id);

      if (found) {
        newCart = newCart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else newCart.push({ ...action.payload, quantity: 1 });

      state.cart = newCart;
    },
    toggleQuantity: (state, action: PayloadAction<cartItem>) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteProduct: (state, action: PayloadAction<cartItem>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    toggleFormType: (state, action: PayloadAction<string>) => {
      state.formType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    });
  },
});

export const { addItemToCart, toggleForm, toggleFormType, toggleQuantity, deleteProduct } =
  userSlice.actions;
export default userSlice.reducer;
