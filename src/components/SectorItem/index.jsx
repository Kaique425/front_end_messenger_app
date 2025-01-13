import './style.css';

import { useEffect } from 'react';

export const SectorItem = ({ sector, setSector, sectors }) => {
  const deleteSector = async () => {
    const response = fetch(`http://127.0.0.1:8000/sectors/${sector.id}/`, {
      method: 'delete',
      header: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.json;

    const remainSectors = sectors.filter((item) => item.id !== sector.id);

    // const remainSectors = sectors.splice(deletedSector, 1);
    setSector(remainSectors);
  };

  useEffect(() => {}, [sectors]);

  return (
    <div className='sector-item'>
      <div className='sector-id'>
        <strong>ID:</strong> {sector?.id}
      </div>
      <div className='sector-name'>
        <strong>Nome:</strong> {sector?.name}
      </div>
      <button className='sector-delete-button' onClick={() => deleteSector()}>
        Apagar
      </button>
    </div>
  );
};
