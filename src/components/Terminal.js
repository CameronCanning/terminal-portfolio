import { useState, useEffect } from 'react';

const Terminal = ({noHeader, user}) => {
    const [auto, setCommand] = useState({command: '', output: <p>test</p>});
    const [contentArray, setContentArray] = useState([]);
    const [current, setCurrent] = useState({
        command: '',
        dir: '',
        typing: false,
        user: user
    });

	//auto type command on update
	useEffect(() => {
		if (auto.command) {
			setTimeout(() => {   
                setCommand(prev => {return { ...prev, command: prev.command.substring(1)}});       				
                setCurrent(prev => {
                    return {
                        ...prev,
                        command: prev.command + auto.command[0]
                    }
                })
            }, 50)
		}
		else if (current.typing) {
            console.log('run');
            setCurrent(prev => {return {...prev, typing: false}});
            setTimeout(() => {
                nextContent()
            }, 1000);
		}
	}, [auto]);

    //intro animation
    useEffect(() => {
        sendCommand('cd portfolio', null, 1500, '/portfolio');
        sendCommand('ls', lsPortfolio, 3500);
        sendCommand('ls', lsPortfolio, 7000);
        sendCommand('ls', lsPortfolio, 10000);
        
    }, []);

    const sendCommand = (command, output, delay, dir) => {  
        setTimeout(() => {
            setCurrent(prev => {return {...prev, typing: true}});            
            setCommand(prev => {return {...prev, command: command, output: output}});
        }, delay); 

    }
    const nextContent = () => {
        //state -> strings
        setContentArray(prev => [...prev, {
            user: `${user}`,
            command: `${current.command}`,
            dir: `${current.dir}`,
            output: auto.output,
            dead: true,
        }]);
        setCurrent(prev => { return {...prev, command: '', dir: '/portfolio'}}); 
    }
    return (
        <div className='terminal'>
            {
                <>
                {!noHeader && <Header/>}
                <div className='bottom-scroll'>
                    <div className='terminal-content-wrapper'>
                        {contentArray.map((e, i) => {
                            return <Content key={i} {...e}/>
                        })}
                        <Content {...current}/>
                    </div>
                </div>
                </>
            } 
        </div>
    ) 
};
const Header = () => <div className='terminal-header'/>;

const Content = ({user, host, dir, typing, command, output, dead}) => {
    console.log(output);
    return (
        <div className='terminal-content'>
            <span className='user-color'>{user && host ? `${user}@${host}` : user || host || ''}</span>
            <span className='dir-color'>{dir ? ':~' + dir : ':~'}</span>
            <span>   
                <span className='terminal-input'>                
                    {' $ '}
                    {command}   
                    {!dead && <span className={typing ? 'cursor' : 'cursor blink'}/>}
                </span>
            </span>
            <span>
                    {output}
            </span>
        </div>
    )
}


const lsPortfolio = <span>
        <div>about.txt</div>
        <div>education.txt</div>
        <div>skills.txt</div>
        <div>projects/</div>
</span>;
console.log(lsPortfolio);
export default Terminal;


