import React from 'react';
import './App.css';
import FormNumericFilters from './components/FormNumericFilters';
import FormSearchByName from './components/FormSearchByName';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Project Star Wars</h1>
      <FormSearchByName />
      <FormNumericFilters />
      <Table />
    </Provider>
  );
}

export default App;
