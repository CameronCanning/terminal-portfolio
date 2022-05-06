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
            setString('');
        }
        ,
        typing
    ]
}

export const useTerminalControl = (_user='user', _dir='', load= 0) => {
    const [loading, setLoadTime] = useState(load);  
    const [sending, setSending] = useState(load ? true : false);	
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(_user);
    const [dir, setDir] = useState(_dir);

    const [commands, setCommands] = useState({});
    const [[command, setCommand], typeCommand, typing] = useAutoType(50, 0, 1100);

    //load effect then call initial command
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoadTime(0);
                setSending(false);
            }, loading);    
        }
    }, [loading]);	

    const run = (cmd) => {
        if (cmd in commands) {
            return commands[cmd]();
        } 
        else {
            return 'command not found';
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
        setSending(false);
    }

    const submit = (cmd, delay) => {
        if (sending) {
            return null;
        }
        else if (cmd) {
            setSending(true);
		    typeCommand(cmd, (typeCommand) => execute(typeCommand), delay);
        }
        return true
	}

    return [
        {
            command,
            user,
            dir,
            history,
            typing,
            loading,
            sending,
            setUser,
            setDir,
            setCommands 
        }
        ,
        submit                         
    ]
}

const welcome = (
    <span>
        <span> __          __  _                            _                                               _     _ </span>
        <span> \ \        / / | |                          | |                                             | |   | |</span>
        <span>  \ \  /\  / /__| | ___ ___  _ __ ___   ___  | |_ ___    _ __ ___  _   _  __      _____  _ __| | __| |</span>
        <span>   \ \/  \/ / _ \ |/ __/ _ \| '_ ` _ \ / _ \ | __/ _ \  | '_ ` _ \| | | | \ \ /\ / / _ \| '__| |/ _` |</span>
        <span>    \  /\  /  __/ | (_| (_) | | | | | |  __/ | || (_) | | | | | | | |_| |  \ V  V / (_) | |  | | (_| |</span>
        <span>     \/  \/ \___|_|\___\___/|_| |_| |_|\___|  \__\___/  |_| |_| |_|\__, |   \_/\_/ \___/|_|  |_|\__,_|</span>
        <span>                                                                    __/ |                             </span>
        <span>                                                                  |___/                               </span>
    </span>
)

console.log(welcome)