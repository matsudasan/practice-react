import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useCounter, UseCounterReturnType } from "./useCounter"
import { STORE, ACTIONTYPE } from "./useCounterReducer"

type Props = {
  dispatch: any
  state: any
}

export const Child2: React.FC<Props> = ({ dispatch, state }) => {
  return (
    <>
      <p data-testid="count">{state.count}</p>
      <button data-testid="increment" onClick={() => dispatch({ type: "increment" })}></button>
    </>
  )
}


export const Child: React.FC<UseCounterReturnType> = ({ count, increment, decrement }) => {
  return (
    <>
      <p data-testid="count">{count}</p>
      <button data-testid="increment" onClick={increment}></button>
    </>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
