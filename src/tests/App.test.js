import React from 'react';
import { getAllByTestId, getByTestId, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetchPlanets from './helpers/mockFetchPlanets';
import userEvent from '@testing-library/user-event';

describe('Implementa casos de testes na aplicação', () => {

  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockFetchPlanets),
  }))

  it('Testa se a tela inicial é renderizada corretamente', async () => {
    render(<App />)

    const title = screen.getByRole('heading', { level: 1, name: /project star wars/i });
    const inputName = screen.getByTestId(/name-filter/i)
    const inputParameters = screen.getByTestId(/column-filter/i)
    const inputOperators = screen.getByTestId(/comparison-filter/i)
    const inputEstimatedValue = screen.getByTestId(/value-filter/i)
    const filterButton = screen.getByTestId(/button-filter/i)

    expect(title).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputParameters).toBeInTheDocument();
    expect(inputOperators).toBeInTheDocument();
    expect(inputEstimatedValue).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(11)
    })

  });

  it('Testa se é possível filtrar a lista de planetas por nome', async() => {
    render(<App />)

    const inputName = screen.getByTestId(/name-filter/i);
    userEvent.type(inputName, 'oo');

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3);
    })

    userEvent.clear(inputName);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })

    userEvent.type(inputName, 'alderaan');

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2);
    })
  })

  it('Testa se é possível aplicar filtros numéricos', async() => {
    render(<App />)

    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const biggerThanOption = screen.getByRole('option', { name: /maior que/i });
    userEvent.selectOptions(inputOperators, biggerThanOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(8);
    });
  });

  it('Testa se é possível aplicar ordenação a tabela', async() => {
    render(<App />)

    const selectParameters = screen.getByTestId('column-sort');
    const rotationOption = screen.getAllByRole('option', { name: /rotation_period/i });
    const ascRadio = screen.getByLabelText(/ascendente/i);
    const dscRadio = screen.getByLabelText(/descendente/i);
    
    userEvent.selectOptions(selectParameters, rotationOption[1]);
    
    userEvent.click(dscRadio);
    
    await waitFor(() => {
      const allNamesPlanets = screen.getAllByTestId(/planet-name/i);
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });
})
