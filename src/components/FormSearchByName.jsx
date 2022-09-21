import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function FormSearchByName() {
  const { nameFilter: { name, setNameFilter } } = useContext(planetsContext);

  const onChange = ({ target }) => {
    setNameFilter(target.value);
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        placeholder="Pesquise por nomes"
        onChange={ onChange }
        data-testid="name-filter"
      />
    </form>
  );
}
