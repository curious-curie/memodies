import React from 'react';
import styled from 'styled-components';
import {DeleteBin} from 'styled-icons/remix-fill/DeleteBin';
import {Edit} from 'styled-icons/boxicons-solid/Edit';


const PostFooterWrapper = styled.div`
    margin-bottom: 10px;
    text-align: right;
    margin-right: 15px;
`;

const HoverEdit = styled(Edit)`
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
    margin-right: 10px;
`;

const HoverDeleteBin = styled(DeleteBin)`
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
`;


const PostFooter = ({id,handleRemove,handleEdit}) => {
    return (
        <PostFooterWrapper>  
            <HoverEdit size = "25" title="edit post" onClick = {handleEdit}/>
            <HoverDeleteBin size="25" title="delete post" onClick = {handleRemove}/>
        </PostFooterWrapper>
    );
};

export default PostFooter;