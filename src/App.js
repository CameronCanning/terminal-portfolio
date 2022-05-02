import Terminal from './components/Terminal';

function App() {
	
	const autoCommand = {
		command: 'cd portfolio && ls',
		directory: {
		  path: 'portfolio'			
		},
		startDelay: 0,
		endDelay: 0,
		speed: 50,
		callback: () => console.log('yo')
	  }

	return (		
		<Terminal user={'cameroncanning'} auto={autoCommand}/>
	);
}

export default App;
