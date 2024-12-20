import React, { useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { autoCloseTags, javascript } from '@codemirror/lang-javascript';
import {java} from '@codemirror/lang-java'
import {dracula} from "@uiw/codemirror-theme-dracula"
import { ACTIONS } from '../helpers/SocketActions.js';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import { languages } from '../helpers/langaugeApi.js';
function EditorComponent({socketRef,roomId,onCodeChange}) {
    const {Language,setLanguage} = useGlobalContext();
    const [value, setValue] = React.useState(`public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, Java World!");
        }
    }`);

    // Set the initial code snippet based on the selected language
    useEffect(() => {
        const languageSnippet = languages.find(lang => lang.name === Language)?.helloWorldSnippet || '';
        setValue(languageSnippet);
      }, [Language]);


    const onChange = React.useCallback((code, viewUpdate) => {
        // console.log('val:', code);
        onCodeChange(code)
        socketRef.current.emit(ACTIONS.CODE_CHANGE,{
            roomId,
            code
        })

        setValue(code);
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                   setValue(code);
                }
            });
        }
        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    return <CodeMirror className='text-lg '  value={value} height="60vh" theme={dracula} extensions={[java()]} onChange={onChange} />;
}

export default EditorComponent