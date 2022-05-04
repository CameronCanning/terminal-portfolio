import { useEffect, useRef } from 'react';

const Terminal = ({loadTime, history, user, dir, command, typing, noHeader=false}) => {
    return (
        <div className='terminal'>
            {!noHeader && <Header/>}
            <div className='bottom-scroll'>
                <div className='terminal-content-wrapper'>
                    {
                        loadTime
                        ?
                        <span className={'cursor blink'}/>
                        :
                        <>
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


