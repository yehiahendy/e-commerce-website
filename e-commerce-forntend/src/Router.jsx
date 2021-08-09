import React from 'react';
import {BrowserRouter,Switch,Route} from"react-router-dom";
import signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import adminDashBoard from './user/adminDashBoard';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import Profile from './user/Profile';
import Dashboard from './user/userDashBoard';
const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/signup' exact component = {signup}/>
                <Route path = '/signin' exact  component = {Signin}/>
                <Route path = '/'  exact component = {Home}/>
                <Route path = '/shop'  exact component = {Shop}/>
                <PrivateRoute path = '/user/dashboard'  exact component = {Dashboard}/>
                <AdminRoute path = '/admin/dashboard'  exact component = {adminDashBoard}/>
                <AdminRoute path = '/create/category'  exact component = {AddCategory}/>
                <AdminRoute path = '/create/product'  exact component = {AddProduct}/>
                <AdminRoute path = '/admin/orders'  exact component = {Orders}/>
                <Route path = '/product/:productId' exact component = {Product}/>
                <AdminRoute path = '/manage/products'  exact component = {ManageProduct}/>
                <AdminRoute path = '/admin/product/update/:productId'  exact component = {UpdateProduct}/>
                <Route path = '/cart'  exact component = {Cart}/>
                <PrivateRoute path = '/profile/update'  exact component = {Profile}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;