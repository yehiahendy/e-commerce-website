import React from 'react';
import {BrowserRouter,Switch,Route} from"react-router-dom";
import signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import dashBoard from './user/userDashBoard';
import PrivateRoute from './auth/PrivateRoute';
import adminDashBoard from './user/adminDashBoard';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Cart from './core/Cart';
const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/signup' exact component = {signup}/>
                <Route path = '/signin' exact  component = {Signin}/>
                <Route path = '/'  exact component = {Home}/>
                <Route path = '/shop'  exact component = {Shop}/>
                <PrivateRoute path = '/user/dashboard'  exact component = {dashBoard}/>
                <AdminRoute path = '/admin/dashboard'  exact component = {adminDashBoard}/>
                <AdminRoute path = '/create/category'  exact component = {AddCategory}/>
                <AdminRoute path = '/create/product'  exact component = {AddProduct}/>
                <Route path = '/product/:productId' exact component = {Product}/>
                <Route path = '/cart'  exact component = {Cart}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;