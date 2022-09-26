import React from 'react';
import './App.css';
import FiltersIndicator from './components/FiltersIndicator';
import FormNumericFilters from './components/FormNumericFilters';
import FormSearchByName from './components/FormSearchByName';
import FormSort from './components/FormSort';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Project Star Wars</h1>
      <FormSearchByName />
      <FormNumericFilters />
      <FormSort />
      <FiltersIndicator />
      <Table />
    </Provider>
  );
}

export default App;
