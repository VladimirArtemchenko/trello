import React from 'react';
import styled from 'styled-components';

export interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => (

  <Root>{children}</Root>

);

export default Modal;

const Root = styled.div`
`;
