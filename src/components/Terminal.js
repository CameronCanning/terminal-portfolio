import { useEffect, useRef } from 'react';

const Welcome = <span>
        <span>{' __          __  _                            _                                               _     _ '}</span>
        <span>{' \ \        / / | |                          | |                                             | |   | |'}</span>
        <span>{'  \ \  /\  / /__| | ___ ___  _ __ ___   ___  | |_ ___    _ __ ___  _   _  __      _____  _ __| | __| |'}</span>
        <span>{"   \ \/  \/ / _ \ |/ __/ _ \| '_ ` _ \ / _ \ | __/ _ \  | '_ ` _ \| | | | \ \ /\ / / _ \| '__| |/ _` |"}</span>
        <span>{'    \  /\  /  __/ | (_| (_) | | | | | |  __/ | || (_) | | | | | | | |_| |  \ V  V / (_) | |  | | (_| |'}</span>
        <span>{'     \/  \/ \___|_|\___\___/|_| |_| |_|\___|  \__\___/  |_| |_| |_|\__, |   \_/\_/ \___/|_|  |_|\__,_|'}</span>
        <span>{'                                                                    __/ |                             '}</span>
        <span>{'                                                                  |___/                               '}</span>
    </span>
    
const Terminal = ({loading, history, user, dir, command, typing, noHeader=false}) => {
    return (
        <div className='terminal'>
            {!noHeader && <Header/>}
            <div className='terminal-body'>
                <div className='terminal-content-wrapper'>
                    {
                        loading
                        ?
                        <span className={'cursor blink'}/>
                        :
                        <>
                        <Welcome/>
                        {history.map((e, i) => {
                            return <Content key={i} {...e}/>
                        })}
                        <Editor command={command} typing={typing} user={user} dir={dir}/>
                        </>
                    }
                </div>
            </div> 
        </div>
    ) 
};

const Header = () => <div className='terminal-header'/>;

const Editor = ({command, typing, user, dir}) => {
    const host = '';
    const ref = useRef();
    useEffect(() => ref.current.scrollIntoView());
    return (
        <div className='terminal-content' ref={ref}>
            <span className='user-color'>{user && host ? `${user}@${host}` : user || host || ''}</span>
            <span className='dir-color'>{dir ? ':~' + dir : ':~'}</span>   
            {' $ '}            
            {command}
            <span className='cursor-wrapper'>
                <span className={typing ? 'cursor' : 'cursor blink'}/>  
            </span>
            
        </div>
    )
}

const Content = ({user, host, dir, command, output}) => {
    return (
        <div className='terminal-content'>
            <span className='user-color'>{user && host ? `${user}@${host}` : user || host || ''}</span>
            <span className='dir-color'>{dir ? ':~' + dir : ':~'}</span>
            <span className='terminal-input'>   
                {' $ '}
                {command}                       
            </span>
            <br/>
            {output}

        </div>
    )
}



export default Terminal;


