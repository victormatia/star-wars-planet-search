import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function FiltersIndicator() {
  const { applyFilters: { applyFilters, setApplyFilters } } = useContext(planetsContext);

  const onClick = ({ target }) => {
    setApplyFilters(applyFilters.filter((filter) => filter.parameter !== target.name));
  };

  return (
    <section>
      { applyFilters.map((filter, i) => (
        <div key={ i } data-testid="filter">
          {
            `Filtro: ${filter.parameter} ${filter.operator} ${filter.estimatedValue}`
          }
          <button
            name={ filter.parameter }
            type="button"
            onClick={ onClick }
          >
            Remover filtro

          </button>
        </div>
      )) }
    </section>
  );
}
