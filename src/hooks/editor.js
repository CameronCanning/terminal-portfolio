import { useEffect, useState } from 'react';

export const useAutoType = (speed) => {
    const [string, setString] = useState('');
    const [auto, setAuto] = useState('');
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (auto) {
            setTimeout(() => {
                setAuto(prev => prev.substring(1));
                setString(prev => prev + auto[0]);
            }, speed)
        }
    }, [auto])

    return [
        string,
        (autoString, delay) => {
            setTimeout(() => setAuto(autoString), delay)
            
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