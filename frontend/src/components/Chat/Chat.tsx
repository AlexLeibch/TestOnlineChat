import React, { FormEventHandler, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Button, ButtonProps, Groups, Input } from 'vienna-ui';
import socket from '../../socket';
import { ChatBody, MessageHeading, MessageWrapper, MessageText, Root, MessageBox, ChatHeader, HeaderTitle, MessageInfo, MessageName, MessageTime, MessageContent, Message } from './Chat.styled';

interface MessageContent {
    author: string;
    message: string;
    room: string;
    time: string;
}

const Chat: React.FC = () => {
    const [currentMessage, setCurrentMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState<MessageContent[]>([]);
    const location = useLocation();
    const room = location.pathname.slice(1);
    const username = localStorage.getItem('username') ?? 'Guest';
    const scrollChat = useRef()

    const handleSendMessage = async () => {
        if (currentMessage) {
            const d = new Date(Date.now());
            const getMinutes = d.getMinutes()
            const minutes = getMinutes.toString().length === 1 ? `0${getMinutes}` : `${getMinutes}`
            const messageData: MessageContent = {
                room: room,
                author: username,
                message: currentMessage,
                time: `${d.getHours()}:${minutes}`,
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
            // @ts-ignore
            scrollChat.current.scrollTop = scrollChat.current.scrollHeight
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
          await handleSendMessage()
        }
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <Root>
            <ChatHeader>
                <HeaderTitle>{room}</HeaderTitle>
            </ChatHeader>
            <ChatBody ref={scrollChat}>
                {messageList.map(({ author, message, time }) => (
                        <MessageWrapper>
                            <MessageBox isAuthor={username === author}>
                                <MessageContent>
                                    <MessageText><Message>{message}</Message></MessageText>
                                        <MessageInfo>
                                    <MessageHeading>
                                        <MessageName>{author}</MessageName>
                                        <MessageTime>{time}</MessageTime>
                                    </MessageHeading>
                                        </MessageInfo>
                                </MessageContent>
                            </MessageBox>
                        </MessageWrapper>
                ))}
            </ChatBody>
            <Groups size='m'>
                <Input
                    size='m'
                    className='chat__input'
                    type='text'
                    placeholder='type message'
                    value={currentMessage}
                    // @ts-ignore
                    onChange={({ target }) => setCurrentMessage(target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendMessage}   design='outline'>
                    &#9658;
                </Button>
            </Groups>
        </Root>
    );
};

export default Chat;
