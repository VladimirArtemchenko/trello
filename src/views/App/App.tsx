import React, {useState}  from "react";
import {Board} from "../components/Board";
import styled from "styled-components";
export const App: React.FC = () => {

    const [boards, setBoards] = useState(['To do', 'In Progress', 'Testing', 'Done']);
    const Page = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 20px;
`
    return (
        <Page>
            {boards.map((el) => {
                return (
                    <Board key={el} title = {el} />
                )
            })}
        </Page>

    )
}