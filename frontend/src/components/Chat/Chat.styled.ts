import styled from 'styled-components';

export const MessageHeading = styled.div`
    font-size: 8pt;
    margin-bottom: 10px;
    text-align: right;
    margin: 0;
`;

export const MessageWrapper = styled.article`
    width: 100%;
    margin: 0 0 10px 0;
    padding: 0;
`;

export const MessageBox = styled.div`
    display: flex;
    background: ${({isAuthor}) => isAuthor ? '#FDFDFD' : '#DFDFDF'};
    padding: 10px 10px 0 10px;
    float: ${({isAuthor}) => isAuthor ? 'right' : 'left'} ;
    width: 200px;
    box-shadow: 0 0 2px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 24%);
    border-radius: ${({isAuthor}) => isAuthor ? '6px 0 0 6px' : '0 6px 6px 0'};
`;

export const MessageContent = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;

`
export const MessageText = styled.div`

`;

export const Message = styled.p `
    font-size: 11pt;
    line-height: 13pt;
    color: #666666;
    margin: 0 0 4px 0;
    line-break: anywhere;
`

export const MessageName = styled.span`
    margin-right: 3px;
    text-align: right;
`

export const MessageTime = styled.span`
    margin-left: 3px;
`

export const MessageInfo = styled.span`
    color: black;
    font-size: 8pt;
    margin-bottom: 10px;
`

export const HeaderTitle = styled.h1`
    margin: 0;
    padding: 9px;
    flex: 1 1 auto;
    text-align: center;
    font: 500 20px/15px 'Arial', sans-serif;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ChatBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    overflow: auto;
    margin: 2px;
`;
export const ChatHeader = styled.header`
    display: flex;
    align-items: center;
    height: 44 px;
    border-bottom: 1 px solid var(--separator_alternate);
    border-radius: 8 px 8 px 0 0;
    flex: 0 0 44 px;
    border-bottom: 1px solid #e7e8ec;
`;

export const Root = styled.div`
    width: 300px;
    -webkit-box-shadow: -5px 2px 18px -7px rgba(34, 60, 80, 0.29);
    -moz-box-shadow: -5px 2px 18px -7px rgba(34, 60, 80, 0.29);
    box-shadow: -5px 2px 18px -7px rgba(34, 60, 80, 0.29);
`;
