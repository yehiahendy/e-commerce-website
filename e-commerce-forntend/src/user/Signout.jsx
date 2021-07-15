/****************************************************************************************************************************************************** */
const SignOut = (next) =>
{
    if(typeof window != 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
        return(fetch("http://localhost:8000/api/signout", {
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