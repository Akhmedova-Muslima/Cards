import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 0, sort = " title " }) => {
    const limit = 12
    const skip = page * limit
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sort}`
    )
    return response.data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    error: null,
    currentPage: 0,
    limit: 12,
    totalCount: 0,
    sortBy: 'title'
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSort: (state, action) => {
      state.sortBy = action.payload
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products
        state.totalCount = action.payload.total
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { setCurrentPage, setSort } = productsSlice.actions
export const selectProducts = (state) => state.products
export default productsSlice.reducer
