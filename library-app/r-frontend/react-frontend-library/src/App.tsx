import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import { ReviewListPage } from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./layouts/ShelfPage/ShelfPage";
import { MessagesPage } from "./layouts/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./layouts/ManageLibraryPage/ManageLibraryPage";
import { PaymentPage } from "./layouts/PaymentPage/PaymentPage";
import ScrollToTop from "./layouts/Utils/ScrollToTop";
 
const oktaAuth = new OktaAuth(oktaConfig);


// MANAGER ADMIN = manageruser@email.com
// MANAGER PASSWORD = manager123!

// TEST USER = testuser@email.com
// TEST PASSWORD = test123!
export const App = () => {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  
  const restoreOriginalUri = async (_oktaAuth:any, originalUri:string) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
       <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Navbar></Navbar>
      <div className="flex-grow-1">
        <ScrollToTop></ScrollToTop>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/home'></Redirect>
          </Route>
          <Route path="/home">
            <HomePage/>
          </Route>
          <Route path="/search">
          <SearchBooksPage />
          </Route>
          <Route path="/reviewlist/:bookId">
            <ReviewListPage></ReviewListPage>
          </Route>
          <Route path="/checkout/:bookId">
          <BookCheckoutPage />
          </Route>
          <Route path="/login" render={()=> <LoginWidget config={oktaConfig}></LoginWidget>}></Route>
          <Route path='/login/callback' component={LoginCallback}/>
          <SecureRoute path="/shelf">
            <ShelfPage></ShelfPage>
          </SecureRoute>

          <SecureRoute path="/messages">
            <MessagesPage/>
          </SecureRoute>
          <SecureRoute path="/admin">
            <ManageLibraryPage/>
          </SecureRoute>

          <SecureRoute path="/fees">
            <PaymentPage/>
          </SecureRoute>
        </Switch>
      </div>
      <Footer></Footer>
      </Security>
    </div>
  );
};
