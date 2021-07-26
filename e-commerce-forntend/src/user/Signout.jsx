/****************************************************************************************************************************************************** */
import { API } from './../config';
const SignOut = (next) =>
{
    if(typeof window != 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
        return(fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(Response =>{
        
            return Response.json();
    
        })
        .catch(err => {
            console.log(err)
        }));
    }
}
export default SignOut ;

/***************************************************************************************************************************************************** */