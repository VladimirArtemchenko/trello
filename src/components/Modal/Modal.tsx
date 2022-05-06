import React from "react";
import styled from "styled-components";
import {ModalProps} from "../../interfaces";

const Modal: React.FC<ModalProps> = ({ children}) => {

    return (
        <Root>{children}</Root>
    )
}

export default Modal

const Root = styled.div`
`;
