import React from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Project Star Wars</h1>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
