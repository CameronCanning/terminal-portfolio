import { useEffect, useState, useRef } from 'react';

export const useAutoType = (speed=50, startDelay=1000, endDelay=1000) => {
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

export const useTerminalControl = (_user='user', _dir='') => {
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(_user);
    const [dir, setDir] = useState(_dir);

    const [[command, setCommand], typeCommand, typing] = useAutoType(50);

    const commands = {
        'cd portfolio': () => {
            setDir('/portfolio')
        },
        'ls': () => {
            return;
        }
    }

    const execute = (cmd) => {
        commands[cmd]();
        setHistory(prev => [
            ...prev,
            {
                user: user,
                dir: dir,
                command: cmd,
            }  
        ]);
        setCommand('');
    }

    const submitCommand = (cmd) => {
		typeCommand(cmd, (typeCommand) => {
			console.log('cb');
			execute(typeCommand);
		
		});
	}

    return [
        command,
        user,
        dir,
        history,
        typing,
        submitCommand
    ]
}