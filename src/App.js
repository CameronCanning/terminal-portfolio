import { useState, useEffect, useCallback } from 'react';

function App() {
	const [command, setCommand] = useState(
		{
			initial: 'cd portfolio && ls',
			visible: ''
		}
	);
	let interval;
	useEffect(() => {
		if (command.initial) { 
			interval = setInterval(() => {
				setCommand(prev => {
					return {					
						initial: prev.initial.substring(1),
						visible: prev.visible + prev.initial[0]
					}					
				})
				}, 100);
			return () => clearTimeout(interval);
		}
		else {
			console.log('run');
		}	
	}, [command]);
	
	
	return (
		<div className='terminal'>
			<div className='terminal-line'>
				<span className='user-color'>cameroncanning</span>
				<span className='dir-color'>:~$</span>
				<input 
					id='terminal-input' 
					autoComplete='false' 
					autoFocus 
					value={command.visible} 
					onChange={(e) => { e.preventDefault() }} 

					/>
			</div>
		</div>

	);
}

export default App;
