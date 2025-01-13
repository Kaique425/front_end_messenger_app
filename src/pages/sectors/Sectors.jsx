import { SectorItem } from '../../components/SectorItem';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../data/constants';
import './style.css';

function Sectors() {
  const [sectors, setSectors] = useState([]);
  const [sectorNameInput, setSectorNameInput] = useState('');

  const getSectors = async () => {
    const response = await fetch(`${BASE_URL}/sectors/`);
    const data = await response.json();
    setSectors(data);
    return data;
  };

  const createSector = async () => {
    const body = { name: sectorNameInput };

    const response = await fetch(`${BASE_URL}/sectors/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setSectors([...sectors, data]);
  };

  const deleteSector = async (sectorId) => {
    const response = await fetch(`${BASE_URL}/sector/${sectorId}/`);
  };

  useEffect(() => {
    getSectors();
  }, []);
  return (
    <div className='sectors-container min-w-[1113px]'>
      <div className='sector-creation-title'>
        <h1>Setores de atendimento:</h1>
        <input
          className='sector-creation-input'
          type='text'
          placeholder='Digite o nome do Setor'
          onChange={(e) => setSectorNameInput(e.target.value)}
        />
        <button
          className='sector-creation-button'
          onClick={() => createSector()}
        >
          Salvar
        </button>
      </div>

      <div className='sectors-visualization'>
        <h1>Setores Cadastrados:</h1>
        {sectors?.map((sector) => (
          <SectorItem
            key={sector.id}
            sector={sector}
            setSector={setSectors}
            sectors={sectors}
          />
        ))}
      </div>
    </div>
  );
}

export default Sectors;
