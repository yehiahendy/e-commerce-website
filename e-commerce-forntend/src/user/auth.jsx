const authentication = (data,next) =>
{
    if(typeof window != 'undefined')
    {
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};
const isAuthenticate = () =>
{
    if(typeof window === 'undefined')
    {
        return false ;
    }
    if(localStorage.getItem('jwt'))
    {
        return (JSON.parse(localStorage.getItem('jwt')));
    }
    else {
        return false;
    }
};
export default authentication ;
export  {isAuthenticate} ;