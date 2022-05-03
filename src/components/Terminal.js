import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAutoType } from '../hooks/editor';
const lsPortfolio = 
    <span>
        <span className='content-command'>about.txt</span>
        <span className='content-command'>education.txt</span>
        <span className='content-command'>skills.json</span>
        <span className='content-command'>projects/</span>
    </span>;

const commands = {
    'cd portfolio': { dir: '/portfolio' },
    'ls': { output: ({dir}) => {
        switch (dir) {
            case '/portfolio':
                return lsPortfolio      
            case '/projects':
                return <p>projects</p>

        }
    }}   
}
const Terminal = (props) => {
    const [loadTime, setLoadTime] = useState(props.loadTime || 2100);  
    const [sending, setSending] = useState(false);
    const [contentArray, setContentArray] = useState([]);
    const [editor, setEditor] = useState({dir: '', user: props.user || 'user'});
    const [batchCommands, setBatchCommands] = useState(['cd portfolio', 'ls']);

    const [command, typeCommand, typing] = useAutoType(50);

    const notInitRender = useRef(false);

    useEffect(() => {
        if (notInitRender.current && !sending && batchCommands.length > 0){
            console.log('sending next');
            nextCommand();
        }
        else {
            notInitRender.current = true
        }
    }, [sending]);

    //load effect then call initial command
    useEffect(() => {
        if (loadTime) {
            console.log('loading...')
            setTimeout(() => setLoadTime(0), loadTime);    
        }
        else if (batchCommands.length > 0) {
            console.log('sending first');
            nextCommand();
        }

    }, [loadTime]);

    const nextCommand = () => {
        let newBatch = [...batchCommands];
        sendCommand(newBatch[0]);
        setBatchCommands(newBatch.slice(1));

    }
    const sendCommand = (command) => { 
        console.log(command);
        if (!typing){          
            setSending(true);
            typeCommand(command, 1000);
        }            
    }

    const executeCommand = (delay=1000) => {
        setTimeout(() => {
            setSending(false);
            let output;
            if (commands[editor.command]) {
                if (typeof commands[editor.command].output === 'function') {
                    output = commands[editor.command].output(editor);
                }
                else {
                    output = commands[editor.command].output;
                }
                setEditor(prev => { return {...prev, command: '', dir: commands[editor.command].dir || prev.dir}}); 
            }
            else {
                output = <p>Command doesn't exist</p>
                setEditor(prev => { return {...prev, command: '', dir: prev.dir}}); 
            }
            //state -> strings
            setContentArray(prev => [...prev, {
                user: `${props.user}`,
                command: `${command}`,
                dir: `${editor.dir}`,
                output: output,
            }]);
    },delay);
        
    }

    return (
        <div className='terminal'>
            {!props.noHeader && <Header/>}
            <div className='bottom-scroll'>
                <div className='terminal-content-wrapper'>
                    {
                        loadTime
                        ?
                        <span className={'cursor blink'}/>
                        :
                        <>
                        {contentArray.map((e, i) => {
                            return <Content key={i} {...e}/>
                        })}
                        <Editor command={command} typing={typing}/>
                        </>
                    }
                </div>
            </div> 
        </div>
    ) 
};

const Header = () => <div className='terminal-header'/>;

const Editor = ({command, typing}) => {
    console.log('command: ' + command);
    const user = 'cameroncanning';
    const host = '';
    const dir = '';
    const ref = useRef();
    useEffect(() => ref.current.scrollIntoView());
    const prompt = ' $ ';
    return (
        <div className='terminal-content' ref={ref}>
            <span className='user-color'>{user && host ? `${user}@${host}` : user || host || ''}</span>
            <span className='dir-color'>{dir ? ':~' + dir : ':~'}</span>
            <span>   
                <span className='terminal-input'>                
                    {prompt}
                    {command}   
                    <span className={typing ? 'cursor' : 'cursor blink'}/>
                </span>
            </span>
        </div>
    )
}

const Content = ({user, host, dir, command, output}) => {
    const prompt = ' $ ';
    return (
        <div className='terminal-content'>
            <span className='user-color'>{user && host ? `${user}@${host}` : user || host || ''}</span>
            <span className='dir-color'>{dir ? ':~' + dir : ':~'}</span>
            <span>   
                <span className='terminal-input'>                
                    {prompt}
                    {command}                       
                </span>
            </span>
            <span>
                {output}
            </span>
        </div>
    )
}



export default Terminal;


