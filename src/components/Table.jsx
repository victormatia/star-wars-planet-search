import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function Table() {
  // const [renderPlanets, setRenderPlanets] = useState([]);

  const {
    planets,
    nameFilter: { name },
    applyFilters: { applyFilters },
    applySort: { applySort },
  } = useContext(planetsContext);

  const filterByName = (planetsArray) => planetsArray
    .filter((planet) => planet.name.toLowerCase().includes(name));

  const filterByNumericFilters = (
    planetsArray,
    numericFilters,
  ) => (
    numericFilters.reduce((acc, curr) => (
      acc.filter((planet) => {
        switch (curr.operator) {
        case 'maior que': {
          return Number(planet[curr.parameter]) > Number(curr.estimatedValue);
        }
        case 'menor que': {
          return Number(planet[curr.parameter]) < Number(curr.estimatedValue);
        }
        case 'igual a': {
          return Number(planet[curr.parameter])
                  === Number(curr.estimatedValue);
        }
        default: return acc;
        }
      })
    ), planetsArray)
  );

  const sortRenderPlanets = (arrPlanets, parameter, typeSort) => {
    if (parameter === 'population') {
      switch (typeSort) {
      case 'DSC': {
        const arrNoUnknown = arrPlanets
          .filter((planet) => planet.population !== 'unknown');
        const arrUnknown = arrPlanets.filter((planet) => planet.population === 'unknown');
        arrNoUnknown.sort((a, b) => b[parameter] - a[parameter]);
        const newArr = [...arrNoUnknown, ...arrUnknown];
        return newArr;
      }
      default: {
        const arrNoUnknown = arrPlanets
          .filter((planet) => planet.population !== 'unknown');
        const arrUnknown = arrPlanets.filter((planet) => planet.population === 'unknown');
        arrNoUnknown.sort((a, b) => a[parameter] - b[parameter]);
        const newArr = [...arrNoUnknown, ...arrUnknown];
        return newArr;
      }
      }
    }

    switch (typeSort) {
    case 'DSC': {
      return arrPlanets.sort((a, b) => b[parameter] - a[parameter]);
    }
    default: {
      return arrPlanets.sort((a, b) => a[parameter] - b[parameter]);
    }
    }
  };

  const filter = (searchName, applyFiltersArr, planetsArr) => {
    if (applyFiltersArr.length > 0 && searchName.length > 0 && applySort.length > 0) {
      const [{ parameter, sort }] = applySort;
      const arr = filterByName(filterByNumericFilters(planetsArr, applyFiltersArr));
      return sortRenderPlanets(arr, parameter, sort);
    }
    if (applyFiltersArr.length > 0 && searchName.length > 0) {
      return filterByName(filterByNumericFilters(planetsArr, applyFiltersArr));
    }
    if (searchName.length > 0) {
      return filterByName(planetsArr);
    }
    if (applyFiltersArr.length > 0) {
      return filterByNumericFilters(planetsArr, applyFiltersArr);
    }
    if (applySort.length) {
      const [{ parameter, sort }] = applySort;
      return sortRenderPlanets(planets, parameter, sort);
    }
    return planets;
  };

  // useEffect(() => {
  //   if (applyFilters.length > 0 && name.length > 0) {
  //     setRenderPlanets(filterByName(filterByNumericFilters(planets, applyFilters)));
  //     return;
  //   }
  //   if (name.length > 0) {
  //     console.log('rodouy');
  //     setRenderPlanets(filterByName(renderPlanets));
  //     return;
  //   }
  //   if (applyFilters.length > 0) {
  //     setRenderPlanets(filterByNumericFilters(planets, applyFilters));
  //     return;
  //   }
  //   if (applySort.length) {
  //     const [{ parameter, sort }] = applySort;
  //     setRenderPlanets(sortRenderPlanets(renderPlanets, parameter, sort));
  //     return;
  //   }

  //   return setRenderPlanets(planets);
  // }, [applyFilters, name, planets, applySort]); // eslint-disable-line

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Priod</th>
          <th>Orbital Priod</th>
          <th>Diamiter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planets.length ? filter(name, applyFilters, planets).map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) : null }
      </tbody>
    </table>
  );
}
