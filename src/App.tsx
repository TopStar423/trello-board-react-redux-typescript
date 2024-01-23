import Board from "./components/Board";
import styled from "styled-components";
import { store } from "./store/store";
import { Provider } from "react-redux";
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Board />
      </Container>
    </Provider>
  );
}

export default App;

const Container = styled.div`
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
`;
