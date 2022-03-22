import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Button, Groups, Input } from 'vienna-ui';
import Peer from 'simple-peer';
import socket from '../../socket';
import { io } from 'socket.io-client';
import { Container, Root, StyledVideo } from './Video.styled';
import freeice from 'freeice';
import UserVideo from '../UserVideo/UserVideo';

const Video: React.FC = (props) => {
    const [peers, setPeers] = useState([]);
    const userVideo = useRef<HTMLVideoElement>(null);
    const peersRef = useRef([]);
    const { roomID } = useParams();



    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            // @ts-ignore
            userVideo.current.srcObject = stream;
            socket.emit('join room', roomID);
            socket.on('all users', (users) => {
                const peers = [];
                users.forEach((userID) => {
                    const peer = createPeer(userID, socket.id, stream);
                    console.log('userID',userID)
                    console.log('socket.id',socket.id)
                    console.log('peer', peer);
                    console.log('peersRef', peersRef)
                    // @ts-ignore
                    peersRef.current.push({
                         // @ts-ignore
                        peerID: userID,
                         // @ts-ignore
                        peer,
                    });
                    // @ts-ignore
                    peers.push(peer);
                    console.log('peers', peers);
                });
                setPeers(peers);
            });

            socket.on('user joined', (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                console.log('payload.signal', payload.signal)
                console.log('payload.callerID', payload.callerID)
                // @ts-ignore
                peersRef.current.push({
                     // @ts-ignore
                    peerID: payload.callerID,
                     // @ts-ignore
                    peer,
                });
                // @ts-ignore
                setPeers((users) => [...users, peer]);
            });

            socket.on('receiving returned signal', (payload) => {
                // @ts-ignore
                const item = peersRef.current.find((p) => p.peerID === payload.id);
                // @ts-ignore
                item.peer.signal(payload.signal);
            });
        });
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            socket.emit('sending signal', { userToSignal, callerID, signal });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            socket.emit('returning signal', { signal, callerID });
        });


        peer.signal(incomingSignal);
        console.log(incomingSignal)

        return peer;
    }



    return (
        <Container>
            <StyledVideo playsInline muted autoPlay ref={userVideo} />
            {peers.map((peer, index) => {
                return <UserVideo key={index}  peer={peer} />;
            })}
        </Container>
    );
};

export default Video;
