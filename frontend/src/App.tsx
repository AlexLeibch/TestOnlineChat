import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Main from './components/Main/Main';
import Video from './components/Video/Video';
import VideoChat from './components/VideoChat/VideoChat';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path=':roomID' element={<VideoChat />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
