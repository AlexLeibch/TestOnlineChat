import React, { useEffect, useRef } from 'react';
import { Video } from './UserVideo.styled'

const UserVideo = (props) => {
    const ref = useRef(null);
    useEffect(() => {
        props.peer.on('stream', (stream) => {
            console.log(stream)
            // @ts-ignore
            ref.current.srcObject = stream;
        });

        props.peer.on('close', () => {

            console.log(ref.current)
                        // @ts-ignore
            ref.current.style.display = 'none';
        })

    }, []);
    // @ts-ignore

    return (
    <>
            {/* @ts-ignore */}
        {<Video playsInline autoPlay muted ref={ref}/> }
    </>
    )
};

export default UserVideo;
