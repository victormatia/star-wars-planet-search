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

  it('Testa se é possível aplicar filtros numéricos com valores maiores que: 8900, e depois remove-los', async() => {
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

    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(8);
      expect(allNamesPlanets[0].innerHTML).toBe('Tatooine');
    });

    const clearFilterBtn = screen.getByRole('button', { name: 'Remover filtro'});
    userEvent.click(clearFilterBtn);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });

  it('Testa se é possível aplicar filtros numéricos com valores menores que: 8900, e depois remove-los', async() => {
    render(<App />)

    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const lessThanOption = screen.getByRole('option', { name: /menor que/i });
    userEvent.selectOptions(inputOperators, lessThanOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3);
      expect(allNamesPlanets[0].innerHTML).toBe('Hoth');
    });

    const clearFilterBtn = screen.getByRole('button', { name: 'Remover filtro'});
    userEvent.click(clearFilterBtn);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });

  it('Testa se é possível aplicar filtros numéricos com valores iguais a: 8900, e depois remove-los', async() => {
    render(<App />)

    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const equalToOption = screen.getByRole('option', { name: /igual a/i });
    userEvent.selectOptions(inputOperators, equalToOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2);
      expect(allNamesPlanets[0].innerHTML).toBe('Dagobah');
    });

    const clearFilterBtn = screen.getByRole('button', { name: 'Remover filtro'});
    userEvent.click(clearFilterBtn);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });

  it('Testa se é possível limpar todos os filtros aplicados', async() => {
    render(<App />)

    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const lessThanOption = screen.getByRole('option', { name: /menor que/i });
    userEvent.selectOptions(inputOperators, lessThanOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3);
      expect(allNamesPlanets[0].innerHTML).toBe('Hoth');
    });

    const clearAllFilterBtn = screen.getByRole('button', { name: 'Remover todos os filtros'});
    userEvent.click(clearAllFilterBtn);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });

  it('Testa se é possível aplicar ordenação decrescente a tabela', async() => {
    render(<App />)

    const selectParameters = screen.getByTestId('column-sort');
    const rotationOption = screen.getAllByRole('option', { name: /rotation_period/i });
    const dscRadio = screen.getByTestId(/column-sort-input-desc/i);
    const orderBtn = screen.getByTestId(/column-sort-button/i);

    
    userEvent.selectOptions(selectParameters, rotationOption[1]);
    
    userEvent.click(dscRadio);
    userEvent.click(orderBtn);
    
    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
      expect(allNamesPlanets[0].innerHTML).toBe('Kamino');
    }, { timeout: 1000 });
  });

  it('Testa se é possível aplicar ordenação crescente a tabela', async() => {
    render(<App />)

    const selectParameters = screen.getByTestId('column-sort');
    const rotationOption = screen.getAllByRole('option', { name: /rotation_period/i });
    const ascRadio = screen.getByTestId(/column-sort-input-asc/i);
    const orderBtn = screen.getByTestId(/column-sort-button/i);

    
    userEvent.selectOptions(selectParameters, rotationOption[1]);
    
    userEvent.click(ascRadio);
    userEvent.click(orderBtn);
    
    const allNamesPlanets = await screen.findAllByTestId(/planet-name/i);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
      expect(allNamesPlanets[0].innerHTML).toBe('Bespin');
    }, { timeout: 1000 });
  });

  it('Testa se, quando ordenada, a tabela posiciona seus elementos com valores desconhecidos por último', async() => {
    render(<App />)

    const selectParameters = screen.getByTestId('column-sort');
    const populationOption = screen.getAllByRole('option', { name: /population/i });
    const ascRadio = screen.getByTestId(/column-sort-input-asc/i);
    const descRadio = screen.getByTestId(/column-sort-input-desc/i);
    const orderBtn = screen.getByTestId(/column-sort-button/i);

    
    userEvent.selectOptions(selectParameters, populationOption[1]);
    
    userEvent.click(ascRadio);
    userEvent.click(orderBtn);
    
    await waitFor(() => {
      const allNamesPlanets = screen.getAllByTestId(/planet-name/i);
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
      expect(allNamesPlanets[8].innerHTML).toBe('Hoth');
      expect(allNamesPlanets[9].innerHTML).toBe('Dagobah');
    }, { timeout: 1000 });

    userEvent.selectOptions(selectParameters, populationOption[1]);
    
    userEvent.click(descRadio);
    userEvent.click(orderBtn);

    await waitFor(() => {
      const allNamesPlanets = screen.getAllByTestId(/planet-name/i);
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
      expect(allNamesPlanets[8].innerHTML).toBe('Hoth');
      expect(allNamesPlanets[9].innerHTML).toBe('Dagobah');
    }, { timeout: 1000 });
  });

  it('Testa se é possível aplicar múltiplos filtros', async () => {
    render(<App />);

    // ordenação decrescente
    const selectParameters = screen.getByTestId('column-sort');
    const rotationOption = screen.getAllByRole('option', { name: /rotation_period/i });
    const dscRadio = screen.getByTestId(/column-sort-input-desc/i);
    const orderBtn = screen.getByTestId(/column-sort-button/i);

    
    userEvent.selectOptions(selectParameters, rotationOption[1]);
    
    userEvent.click(dscRadio);
    userEvent.click(orderBtn);

    // aplicação de filtro numérico
    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const lessThanOption = screen.getByRole('option', { name: /menor que/i });
    userEvent.selectOptions(inputOperators, lessThanOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    // filtragem por nome 
    const inputName = screen.getByTestId(/name-filter/i);
    userEvent.type(inputName, 'o');

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1);
    });
  });

  it('Testa se é possível aplicar filtros numéricos e depois pesquisar por nome', async () => {
    render(<App />);

    // aplicação de filtro numérico
    const inputParameters = screen.getByTestId(/column-filter/i);
    const diameterOption = screen.getAllByRole('option', { name: /diameter/i });
    userEvent.selectOptions(inputParameters, diameterOption[0]);

    const inputOperators = screen.getByTestId(/comparison-filter/i);
    const lessThanOption = screen.getByRole('option', { name: /menor que/i });
    userEvent.selectOptions(inputOperators, lessThanOption);

    const inputEstimatedValue = screen.getByTestId(/value-filter/i);
    userEvent.clear(inputEstimatedValue);
    userEvent.type(inputEstimatedValue, '8900');

    const filterButton = screen.getByTestId(/button-filter/i);
    userEvent.click(filterButton);

    // filtragem por nome 
    const inputName = screen.getByTestId(/name-filter/i);
    userEvent.type(inputName, 'h');

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2);
    });
  });
});
