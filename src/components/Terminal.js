import { useEffect, useRef } from 'react';
    
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


