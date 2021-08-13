import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticate } from '../user/auth';
function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
    <Route
        {...rest}
        render={(props) => isAuthenticate()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
    )
}
export default PrivateRoute;