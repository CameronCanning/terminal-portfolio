import { useState, useEffect, useRef } from 'react';

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
    const [auto, setAuto] = useState('');
    const [contentArray, setContentArray] = useState([]);
    const [editor, setEditor] = useState({});

    const [initCommands, setInitCommands] = useState(['cd portfolio', 'ls', 'ls', 'ls']);
    const notInitRender = useRef(false);
	//auto type command on update
	useEffect(() => {   
        if (auto) {
            setTimeout(() => {   
                setAuto(prev => prev.substring(1));       				
                setEditor(prev => {
                    return {
                        ...prev,
                        command: prev.command + auto[0]
                    }
                })
            }, props.typingSpeed || 50)
        }
        else if (editor.typing && editor.command) {
            setTimeout(() => executeCommand(), 500);
            setEditor(prev => {return {...prev, typing: false}}); 
        }
	}, [auto]);

    useEffect(() => {
        if (notInitRender.current && !sending){
            console.log('sending rest');
            sendCommand(initCommands.shift());
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
        else if (initCommands.length > 0) {
            console.log('sending first');
            let newInitCommands = [...initCommands];
            sendCommand(newInitCommands.shift());
            setInitCommands(newInitCommands);
        }

    }, [loadTime]);

    useEffect(() => {
        setContentArray([]);
        setEditor({
            command: '',
            dir: '',
            typing: false,
            user: props.user || 'user'
        });
    }, []);

    const sendCommand = (command, delay=1000) => { 
        if (!editor.typing){
            setTimeout(() => {
                setEditor(prev => {return {...prev, typing: true}});    
                setSending(true);
                setAuto(command)        
            }, delay)
        }            
    }

    const executeCommand = () => {
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
            command: `${editor.command}`,
            dir: `${editor.dir}`,
            output: output,
        }]);
        
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
                        <Editor {...editor}/>
                        </>
                    }
                </div>
            </div> 
        </div>
    ) 
};

const Header = () => <div className='terminal-header'/>;

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

const Editor = ({user, host, dir, typing, command}) => {
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

export default Terminal;


