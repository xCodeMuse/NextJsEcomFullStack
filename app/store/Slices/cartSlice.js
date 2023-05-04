import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add_to_cart,delete_cart_data,update_cart_data,get_cart_data } from "@/app/services";
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
};

export const fetchCartById = createAsyncThunk(
    'users/fetchCartData',
    async (userId, thunkAPI) => {
      const response = await get_cart_data(userId)
      return response
    }
  )

export const addToCart = createAsyncThunk(
    'users/addToCart',
    async (data, thunkAPI) => {
        try{    
            const res = await add_to_cart(data);
            return {...data,_id:res._id}
        }catch(e){
            console.log('Problem addding to cart')
        }
      
    }
)


export const updateCart = createAsyncThunk(
    'users/updateCart',
    async (data, thunkAPI) => {
        try{    
            const res = await update_cart_data(data);
            console.log(res)
            return {quantity:data.quantity,productID:data.productID}
        }catch(e){
            console.log('Problem addding to cart')
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'users/removeFromCart',
    async (data, thunkAPI) => {
        try{
            const res = await delete_cart_data(data);
            return {productID:data.productID}
        }catch(e){
            console.log('Problem addding to cart')
        }
      
    }
  )

export const CartSlice = createSlice({
    name: 'cartData',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchCartById.fulfilled, (state, action) => {
          // Add cart data to the state array
          console.log(action,'builder case')
            const data = action.payload
            let quantity = 0
            let totalPrice = 0;
            if(data){
                data.forEach(val =>{
                    quantity += val.productQuantity
                    totalPrice += val.productPrice * val.productQuantity
                })
                state.cart = [...data]
                state.totalPrice = totalPrice
                state.totalQuantity = quantity
            }
        }).addCase(addToCart.fulfilled,(state,action) =>{
            // Add new product data to the cart state array
            const oldCartState = state.cart
            state.cart = [action.payload,...oldCartState]
            state.totalQuantity = state.totalQuantity + 1
            state.totalPrice = state.totalPrice + action.payload.productPrice
        }).addCase(removeFromCart.fulfilled,(state,action) =>{
            // remove product datafrom the cart state array
             const newCartState = state.cart.filter(val =>{
                if(val.productID !== action.payload.productID){
                        return val
                    }
                })
            const productToRemove = state.cart.filter(val =>{
                    if(val.productID == action.payload.productID){
                        return val
                    }
                })
            state.cart = newCartState
            state.totalQuantity = state.totalQuantity - productToRemove[0].productQuantity
            state.totalPrice = state.totalPrice - (productToRemove[0].productPrice * productToRemove[0].productQuantity)
        }).addCase(updateCart.fulfilled,(state,action) =>{
            // remove product datafrom the cart state array
        
            const newCartState = [] 
            state.cart.map(val =>{
                    if(val.productID === action.payload.productID){
                        val.productQuantity = action.payload.quantity
                        newCartState.push(val)
                    }else{
                        newCartState.push(val)
                    }
                })
            let quantity = 0
            let totalPrice = 0;
            console.log(newCartState)
            newCartState.forEach(val =>{
                quantity += val.productQuantity
                totalPrice += val.productPrice * val.productQuantity
            })
            
            state.totalPrice = totalPrice
            state.totalQuantity = quantity
            state.cart = newCartState
        })
      }
})
