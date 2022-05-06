import { useEffect, useState } from 'react';
import { useTerminalControl } from './hooks/editor';
import Terminal from './components/Terminal';

const App = () => {	
	const [terminal, submit] = useTerminalControl('cameroncanning', '', 2100);

	const commandsAlias = [
		{alias: '👨‍💻About', value: 'cat about.txt'},
		{alias: '📖Education', value: 'cat education.txt'},
		{alias: '⌨️Skills', value: 'cat skills.json'},
		{alias: '🛠️Projects', value: 'cat ./projects/*'},
		{alias: '✉️Contact', value: 'cat contact.json'}
	];
	const [readyProgress , setReadyProgress] = useState(2);

	const tab = <>&nbsp;&nbsp;&nbsp;</>;

	useEffect(() => {
		if (!terminal.loading && terminal.history.length === 0){
			submit('cd portfolio', 2000);
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [terminal.loading]);

	useEffect(() => {		
		if (!terminal.sending && readyProgress > 0) {
			setReadyProgress(prev => prev - 1);
		}
	}, [terminal.sending, readyProgress]);

	useEffect(() => {
		terminal.setCommands({
			'cd portfolio': () => {
				terminal.setDir('/portfolio');
				return null;
			},
			'cat about.txt': () => {
				return  'My name is ^^^, I\'m a fullstack devloper with an insatiable hunger for learning.'
			},
			'cat education.txt': () => {
				return 'Bachelor of Computer Science, Carleton University';
			},
			'cat skills.json': () => {
				return (
					<span>
						{'{'}
						<br/>
						{tab}<span className='json-key'>languages</span>: [ "Javascript", "Python", "Java", "C/C++" ],
						<br/>
						{tab}<span className='json-key'>libraries</span>: [ "React", "Node.js", "Express.js", "Flask" ],
						<br/>
						{tab}<span className='json-key'>databases</span>: [ "MongoDb", "MySQL" ],
						<br/>
						{tab}<span className='json-key'>tools</span>:{tab}&nbsp;&nbsp;[ "Git", "Docker", "Heroku", "Mongo Atlas" ]
						<br/>
						{'}'}
					</span>
				)
			},
			'cat ./projects/*': () => {
				const projects = [
					{
						name: 'auto-terminal',
						description: 'An autotyping terminal for React (you\'re using it right now!)',
						//github: 'github.com/cameroncanning/short-earl',
						demo: 'https://cameroncanning.com'
					},
					{
						name: 'short-earl',
						description: 'URL shortener developed using MERN',
						github: 'https://github.com/cameroncanning/short-earl',
						website: 'https://shortearl.herokuapp.com'

					},
					{
						name: 'lottery-sim',
						description: 'Lottery simulator made with React',
						github: 'https://github.com/cameroncanning/lottery-sim',
						website: 'https://cameroncanning.github.io/lottery-sim/'

					},
					{
						name: 'wikipage-connecter',
						description: 'Flask API that finds the shortest chain between 2 pages',
						github: 'https://github.com/cameroncanning/wikipage-connecter',

					},
					{
						name: 'NEATproject',
						description: 'Implementation of a NeuroEvolution of Augmenting Topologies (NEAT) genetic algorithm in pure python',
						github: 'https://github.com/CameronCanning/NEATproject'
					},
					{
						name: 'PaintSheetGenerator',
						description: 'Generates a paint by number sheet from any image',
						github: 'https://github.com/Davidj361/PaintSheetGenerator',
					},

				]

				return (
					<span>																	
						{projects.map(p => {
							return (
								<span key={p.name}>		
									{'{'}<br/>							
									<span>
										<span className='json-key'>	{tab}name</span>: "{p.name}"<br/>
									</span>										
									<span>
										<span className='json-key'>{tab}description</span>: "{p.description}"<br/>
									</span>
									{!!p.github && 
									<span>
										<span className='json-key'>{tab}github</span>: "<Link>{p.github}</Link>"<br/>
									</span>
									}
									{!!p.website && 
									<span>
										<span className='json-key'>{tab}website</span>: "<Link>{p.website}</Link>"<br/>
									</span>}
									{!!p.demo && 
									<span>
										<span className='json-key'>{tab}demo</span>: "<Link>{p.demo}</Link>"<br/>
									</span>}
									{'}'}
								</span>
							)
						})} 
					</span>
				)
			},
 			'cat contact.json': () => {
				return (
					<span>
						{'{'}
						<br/>
						{tab}<span className={'json-key'}>phone</span>: "
							<a  className={'terminal-link'} 
								href='tel:705-309-1862'>705-309-1862</a>",
						<br/>
						{tab}<span className={'json-key'}>email</span>: "
							<a  className={'terminal-link'} 
								href='mailto:cameroncanning.1@gmail.com'>
								cameroncanning.1@gmail.com</a>"
						<br/>
						{'}'}
					</span>
				)
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (	
		<>
		<div className='center-vertical'>
			<div className='container'>
				<div className={(readyProgress === 0 ? 'fade-in ' : '') + 'command-container'}>
					{commandsAlias.map(cmd => 
						<span
							key={cmd.alias} 
							className='command-btn' 
							onClick={()=>submit(cmd.value)}
							>
							{cmd.alias}
						</span>
					)}
				
				</div>	
				<Terminal {...terminal}/>					
			</div>
		</div>
		</>
	);
}

const Link = ({children}) => {
	return (
		<a  className='terminal-link'
			href={children}
			target="_blank" 
			rel="noopener noreferrer">
			{children}
		</a>
	)
}

export default App;
