import React, { useContext, useState, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

const INITIAL_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FormNumericFilters() {
  const [allFilters, setAllFilters] = useState(INITIAL_FILTERS);

  const {
    numericFilters: {
      filters, filters: { parameter, operator, estimatedValue }, setNumericFilters,
    },
    applyFilters: { applyFilters, setApplyFilters },
  } = useContext(planetsContext);

  const onChange = ({ target }) => {
    setNumericFilters({
      ...filters,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (applyFilters.length > 0) {
      const filtersNameApply = applyFilters.map((filter) => filter.parameter);
      setAllFilters(allFilters.filter((filter) => !(filtersNameApply.includes(filter))));
    } else {
      setAllFilters(INITIAL_FILTERS);
    }
  }, [applyFilters]); // eslint-disable-line

  const onClick = (event) => {
    event.preventDefault();
    setApplyFilters([...applyFilters, { parameter, operator, estimatedValue }]);
  };

  return (
    <form>
      <select
        name="parameter"
        value={ filters.parameter }
        onChange={ onChange }
        data-testid="column-filter"
      >
        { allFilters
          .map((filter) => <option key={ filter } value={ filter }>{ filter }</option>) }
      </select>
      <select
        name="operator"
        value={ filters.operator }
        onChange={ onChange }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="estimatedValue"
        value={ filters.estimatedValue }
        onChange={ onChange }
        type="number"
        placeholder="Digite um valor estimado"
        data-testid="value-filter"
      />
      <button
        type="submit"
        onClick={ onClick }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}
