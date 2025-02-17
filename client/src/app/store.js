import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer.js";

import { authApi } from "../features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";

export const appStore = configureStore({
   
       reducer : rootReducer,
       middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
    
})
//after refreshing the page the user will still be logged in rtk redux query and always be user
const initializeApp = async () => {
       await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
   }
   initializeApp();