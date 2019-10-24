import React from 'react';
import { Container, Button } from 'react-floating-action-button'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddButton = () => {
    return (
       <Container>
        <Button
                tooltip="Write a post"
                rotate={false}
                styles={{backgroundColor: '#F5F5F5', color: 'E0E0E0'}}><FontAwesomeIcon icon={faPen} size="lg" /></Button>
       </Container>
    );
};

export default AddButton;