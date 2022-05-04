import { useEffect, useState, useRef } from 'react';

export const useAutoType = (speed=50, startDelay=1000, endDelay=1000) => {
    const [string, setString] = useState('');
    const [auto, setAuto] = useState('');
    const [typing, setTyping] = useState(false);
    const [callback, setCallback] = useState(()=>()=>{});
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
                callback(string);
                setCallback(()=>()=>{});
            }, endDelay);
        }
    }, [auto])

    return [
        `${string}`,
        (autoString, callback, delay) => {         
            setCallback((()=>callback));   
            setTimeout(() => {
                setAuto(autoString);
                setTyping(true); 
            }, delay || startDelay);
            
        },
        typing
    ]
}

export const useEditor = (
    setString = '',
    command = '', 
    dir = '', 
    typing = false, 
    user = 'user',
    delay = 50
) => {
    const [auto, setAuto] = useState('');
    useEffect(() => {
        console.log('1');
    })
}