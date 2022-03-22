import styled from 'styled-components';

export const Root = styled.div`
    background: linear-gradient(to right, #e95454f7, #ffd400, #fbff00, #10ff0082, #00d5ff, #0029ffb5, #ed00ff);
`;

export const Container = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: center;
`

export const StyledVideo = styled.video`
    max-height: 300px;
    width: 300px;
`;
