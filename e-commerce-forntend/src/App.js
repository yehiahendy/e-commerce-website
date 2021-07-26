import React,{useEffect} from 'react';
import Routes from './Router'
function App() {
  useEffect(() => {
    document.title = "E-commerce website"
 }, []);
 
  return (<Routes> </Routes>);
}

export default App;
