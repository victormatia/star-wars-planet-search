import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

const INITIAL_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FormNumericFilters() {
  const {
    numericFilters: {
      filters, filters: { parameter, operator, estimatedValue }, setNumericFilters,
    },
    applyFilters: { applyFilters, setApplyFilters },
    allFilters: { allFilters, setAllFilters },
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
  }, [applyFilters]);

  const onClick = (event) => {
    event.preventDefault();
    setApplyFilters([...applyFilters, { parameter, operator, estimatedValue }]);
    setNumericFilters({
      parameter: allFilters[0],
      operator: 'maior que',
      estimatedValue: '0',
    });
  };

  return (
    <form>
      <select
        name="parameter"
        value={ parameter }
        onChange={ onChange }
        data-testid="column-filter"
      >
        { allFilters
          .map((filter) => <option key={ filter } value={ filter }>{ filter }</option>) }
      </select>
      <select
        name="operator"
        value={ operator }
        onChange={ onChange }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="estimatedValue"
        value={ estimatedValue }
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
