import { useState, useEffect } from 'react';

function App() {
  const portfolioCommand = 'cd portfolio && ls';
  const [command, setCommand] = useState()
  useEffect(() => {
    portfolioCommand.split('').forEach(element => {
      console.log(element);
    });
  },[]); 

  
  return (
    <div className='terminal'>
      <code>
        <span className='userColor'>cameroncanning</span><span className='dirColor'>:~$</span>{portfolioCommand}
      </code>
    </div>
    
  );
}

export default App;
