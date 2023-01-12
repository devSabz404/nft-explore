/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store,persistor } from "./core/store";	
import { Provider } from 'react-redux'
import PrivateRoute from "./private/PrivateRoute";
import { ReactQueryDevtools } from 'react-query/devtools'
import {

  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
const queryClient = new QueryClient()

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>    
    <PrivateRoute >
    <QueryClientProvider client={queryClient}> 
    <ReactQueryDevtools/>
    <App />
    </QueryClientProvider>
    </PrivateRoute>
    </PersistGate>

    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
