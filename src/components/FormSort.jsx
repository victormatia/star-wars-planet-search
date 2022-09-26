import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

const allParameters = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FormSort() {
  const {
    sort: { sort, setSort },
    applySort: { setApplySort },
  } = useContext(planetsContext);

  const onChange = ({ target: { name, value, type, id } }) => {
    const isValue = type === 'radio' ? id : value;
    setSort({
      ...sort,
      [name]: isValue,
    });
  };

  const onClick = (event) => {
    event.preventDefault();
    setApplySort([sort]);
  };

  return (
    <form>
      <select
        name="parameter"
        value={ sort.parameter }
        onChange={ onChange }
        data-testid="column-sort"
      >
        { allParameters
          .map((parameter) => (
            <option key={ parameter } value={ parameter }>{ parameter }</option>
          )) }
      </select>
      <fieldset>
        <label htmlFor="ASC">
          Ascendente
          <input
            onChange={ onChange }
            id="ASC"
            name="sort"
            type="radio"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DSC">
          Descendente
          <input
            onChange={ onChange }
            id="DSC"
            name="sort"
            type="radio"
            data-testid="column-sort-input-desc"
          />
        </label>
      </fieldset>
      <button
        type="submit"
        onClick={ onClick }
        data-testid="column-sort-button"
      >
        Ordenar

      </button>
    </form>
  );
}
