import { useEffect, useState, useRef } from 'react';

export const useAutoType = (speed=50, startDelay=0, endDelay=0) => {
    const [string, setString] = useState('');
    const [auto, setAuto] = useState('');
    const [typing, setTyping] = useState(false);
    const [callback, setCallback] = useState(null);
    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
        }
        else if (auto) {
            setTimeout(() => {
                setAuto(prev => prev.substring(1));
                setString(prev => prev + auto[0]);
            }, speed)
        }
        else if (typing) {
            setTyping(false);
            setTimeout(() => {
                if (callback) {
                    callback(string);
                    setCallback(null);
                }
            }, endDelay);
        }
    }, [auto])

    return [
        [string, setString]
        ,
        (autoString, callback, delay) => {         
            if (callback) setCallback((()=>callback));   
            setTimeout(() => {
                setAuto(autoString);
                setTyping(true); 
            }, delay || startDelay);
            setString('')
        }
        ,
        typing
    ]
}

export const useTerminalControl = (_user='user', _dir='', load= 0) => {
    const [loading, setLoadTime] = useState(load);  	
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(_user);
    const [dir, setDir] = useState(_dir);

    const [[command, setCommand], typeCommand, typing] = useAutoType(50, 0, 1100);

    //load effect then call initial command
    useEffect(() => {
        if (loading) {
            console.log('loading...')
            setTimeout(() => setLoadTime(0), loading);    
        }
        else {
			console.log('loaded');
			submitCommand('cd portfolio', 2000);
        }
    }, [loading]);	

    const run = (cmd) => {
        const commands = {
            'cd portfolio': () => {
                setDir('/portfolio');
                //return null;
            },
            'ls': () => {
                return <p>list</p>;
            }
        }
        if (cmd in commands) {
            return commands[cmd]();
        } 
        else {
            return <p>Command does not exist</p>
        }
    }

    const execute = (cmd) => {
        let output = run(cmd);
        setHistory(prev => [
            ...prev,
            {
                user: user,
                dir: dir,
                command: cmd,
                output: output
            }  
        ]);
        setCommand('');
    }

    const submitCommand = (cmd, delay) => {
		typeCommand(cmd, (typeCommand) => {
			execute(typeCommand);
		}, delay);
	}

    return [
        {
            command,
            user,
            dir,
            history,
            typing,
            loading
        }
        ,
        submitCommand   
    ]
}
