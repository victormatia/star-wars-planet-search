import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function FormNumericFilters() {
  const { numericFilters: { filters, setNumericFilters } } = useContext(planetsContext);

  const onChange = ({ target }) => {
    setNumericFilters({
      ...filters,
      [target.name]: target.value,
    });
  };

  const onClick = (event) => {
    event.preventDefault();
    setNumericFilters({
      ...filters,
      wasSearchedByNumericFilters: true,
    });
  };

  return (
    <form>
      <select
        name="parameter"
        value={ filters.parameter }
        onChange={ onChange }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
