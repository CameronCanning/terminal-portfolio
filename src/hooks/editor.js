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
            
        }
        ,
        typing
    ]
}

export const useEditorControl = (_user='user', _dir='') => {
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(_user);
    const [dir, setDir] = useState(_dir);

    useEffect(()=> {
        console.log('com');
        console.log(user);
        console.log(dir);
    },[user, dir])
    const commands = {
        'cd portfolio': async () => {
            setDir('/portfolio')
            console.log('commands');
        },
        'ls': () => {
            return
        }
    }

    const execute = async (cmd) => {
        await commands[cmd]();
        setHistory(prev => [
            ...prev,
            {
                user: user,
                dir: dir,
                command: cmd,
            }
        ]);
    }
    return [
        execute,
        history,
        user,
        dir,
    ]
}