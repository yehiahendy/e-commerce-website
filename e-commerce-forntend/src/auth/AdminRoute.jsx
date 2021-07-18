import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticate } from '../user/auth';
function AdminRoute ({component: Component, authed, ...rest}) {
    return (
    <Route
        {...rest}
        render={(props) => isAuthenticate() && (isAuthenticate().user.role === 1)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
    )
}
export default AdminRoute;