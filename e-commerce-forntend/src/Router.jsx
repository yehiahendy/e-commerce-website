import React from 'react';
import {BrowserRouter,Switch,Route} from"react-router-dom";
import signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';

const Routes = ()=>{
    return (
        <BrowserRouter>
           
            <Switch>
                <Route path = '/signup'  component = {signup}/>
                <Route path = '/signin'  component = {Signin}/>
                <Route path = '/'  component = {Home}/>

            </Switch>
        </BrowserRouter>
    );
}
export default Routes;