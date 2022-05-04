import { useState, useEffect, useRef } from 'react';
import { useTerminalControl } from './hooks/editor';
import Terminal from './components/Terminal';
import Command from './components/Command';

const lsPortfolio = 
    <span>
        <span className='content-command'>about.txt</span>
        <span className='content-command'>education.txt</span>
        <span className='content-command'>skills.json</span>
        <span className='content-command'>projects/</span>
    </span>;

const commands = {
    'cd portfolio': { dir: '/portfolio' },    
}

function App() {
	const [loadTime, setLoadTime] = useState(2100);  	
	const [command, user, dir, history, typing, submitCommand] = useTerminalControl('cameroncanning');
	//const [{execute, command}, history, user, dir] = useEditorControl('cameroncanning');
    //const didMount = useRef(false);
    
    //load effect then call initial command
    useEffect(() => {
        if (loadTime) {
            console.log('loading...')
            setTimeout(() => setLoadTime(0), loadTime);    
        }
        else {
			console.log('loaded');
			submitCommand('cd portfolio');
        }
    }, [loadTime]);	

	return (	
		<>	
		<Command/>
		<Command/>
		<Terminal 
			loadTime={loadTime} 
			command={command}
			typing={typing}
			history={history}
			user={user}
			dir={dir}
			/>
		</>
	);
}

export default App;
