const URL = 'https://swapi.dev/api/planets';

export default async function fecthPlanets() {
  const response = await fetch(URL);
  const data = await response.json();

  return data.results;
}
