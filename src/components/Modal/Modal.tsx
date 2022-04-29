import React from "react";
import styled from "styled-components";

interface ModalProps {
    isActive: boolean;
    children: React.ReactNode;
}

 const Modal: React.FC<ModalProps> = ({isActive, children}) => {

    return (

        <Root isActive={isActive}>{children}</Root>

    )
}

export default Modal

const Root = styled.div<ModalProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  visibility: ${props => props.isActive ? "visible" : "hidden"};
  display: flex;
  justify-content: center;
  align-items: center;
`;
