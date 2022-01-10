import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDeliveries, postDelivery} from '../services';

// interface DeliveryData {
//   id: string;
//   address: string;
//   city: string;
//   zipCode: string;
//   lat: number;
//   lng: number;
//   customer: string;
// }

export const fetchDeliveries = createAsyncThunk('GET_DELIVERIES', async () => {
  return getDeliveries();
});

export const finishDelivery = createAsyncThunk(
  'FINISH_DELIVERY',
  async ({id, status, lat, lng}) => {
    return postDelivery(id, status, lat, lng);
  },
);

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState: {
    deliveries: [],
    hasActive: '',
    loading: false,
  },
  reducers: {
    activeDelivery(state, action) {
      state.hasActive = action.payload;
    },
    finishDelivery(state, action) {},
  },
  extraReducers: builder => {
    builder.addCase(fetchDeliveries.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchDeliveries.fulfilled, (state, action) => {
      state.deliveries = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDeliveries.rejected, state => {
      state.loading = false;
    });
    builder.addCase(finishDelivery.fulfilled, (state, action) => ({
      ...state,
      hasActive: '',
    }));
  },
});

const {actions} = deliveriesSlice;
export const {activeDelivery} = actions;
export default deliveriesSlice.reducer;
