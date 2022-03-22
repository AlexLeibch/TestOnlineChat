import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Groups, Input, Text } from 'vienna-ui';
import '../../App.css';
import socket from '../../socket';

const Main: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        socket.on('me', (id) => {
            setId(id);
            localStorage.setItem('myId', id);
            console.log(id);
        });
    }, []);

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    };

    const handleJoinRoomClick = () => {
        if (username !== '' && room !== '') {
            localStorage.setItem('username', username);
            socket.emit('join_room', room);
            navigate(room);
        }
    };

    return (
        <Groups design='vertical'>
            <Flex gap='s2'>
                <Input
                    size='m'
                    type='text'
                    className='name'
                    value={username}
                    placeholder='Enter you name'
                    onChange={handleNameChange}
                />
                <Input size='m' type='text' value={room} placeholder='Room name' onChange={handleRoomChange} />
            </Flex>
            <Groups>
                <Groups design='vertical'>
                    <Text type='p' size='m'>
                        Войти в текстовый чат
                    </Text>
                    <Button onClick={handleJoinRoomClick} className='submit' design='outline'>
                        Создать комнату
                    </Button>
                </Groups>
            </Groups>
        </Groups>
    );
};

export default Main;
