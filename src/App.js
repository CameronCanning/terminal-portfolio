import { useState, useEffect, useRef } from 'react';
import { useTerminalControl } from './hooks/editor';
import Terminal from './components/Terminal';
import Command from './components/Command';

function App() {	
	const [terminal, submitCommand] = useTerminalControl('cameroncanning', '', 2100);
	return (	
		<>	
		<button onClick={()=>submitCommand('ls')}>ls</button>
		<button onClick={()=>submitCommand('lol')}>ls</button>
		<Terminal {...terminal}/>
		</>
	);
}

export default App;
