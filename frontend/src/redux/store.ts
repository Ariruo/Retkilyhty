// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have a rootReducer,
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
      
      },
});

export default store;