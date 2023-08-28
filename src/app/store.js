import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/slice/userSlice';
import profileReducer from '../features/slice/profileSlice'
import borderReducer from '../features/slice/BordersSlice'
import incomeReducer from '../features/slice/incomeSlice'
import expenceReducer from '../features/slice/expenceSlice'
import roomReducer from '../features/slice/roomSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        border: borderReducer,
        income: incomeReducer,
        expence: expenceReducer,
        room: roomReducer,
    }
 });


 export default store;
