// import './style.css';
import { Link } from 'react-router-dom';

import { PainelChatIcon } from '../../Icons/PainelChatIcon';
import { PainelContactIcon } from '../../Icons/PainelContactIcon';
import { PainelWhatsAppIcon } from '../../Icons/PainelWhatsAppIcon';
import { PainelHistoryIcon } from '../../Icons/PainelHistoryIcon';
import { PainelSettingsIcon } from '../../Icons/PainelSettingsIcon';
import { PainelTemplateIcon } from '../../Icons/PainelTemplateIcon';
export const SidePainel = () => {
  const menuItems = [
    { id: 1, to: '/chat', icon: <PainelChatIcon />, label: 'Atendimentos' },
    {
      id: 2,
      to: '/sector',
      icon: <PainelSettingsIcon />,
      label: 'Configurações',
    },
    { id: 3, to: '/channels', icon: <PainelWhatsAppIcon />, label: 'Canais' },
    {
      id: 4,
      to: '/templates',
      icon: <PainelTemplateIcon />,
      label: 'Templates',
    },
    {
      id: 5,
      to: '/history',
      icon: <PainelHistoryIcon />,
      label: 'Histórico',
    },
    { id: 6, to: '/contacts', icon: <PainelContactIcon />, label: 'Contatos' },
  ];

  return (
    <aside className='h-full'>
      <nav className='h-full w-fit flex flex-col flex-grow bg-black border-r shadow-sm px-1'>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className='relative flex items-center py-2 px-3 my-1 font-medium 
                    rounded-md cursor-pointer transition-colors group
                    hover:bg-gray-700'
          >
            <Link
              className='flex flex-wrap w-full p-3'
              to={item.to}
              aria-label={item.label}
            >
              {item.icon}
              <span className='pl-2 text-xl text-white group-hover:text-green-500'>
                {item.label}
              </span>
            </Link>
          </div>
        ))}

        <div className='border-t flex p-3 mt-auto'>
          <img
            src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
            alt=''
            className='w-10 h-10 rounded-md'
          />
          <div className='overflow-hidden truncate flex justify-between items-center w-52 ml-3'>
            <div className='leading-4 '>
              <h4 className='font-semibold'>Kaique Silva</h4>
              <span className='truncate text-xs text-gray-600'>
                kaique.silva@gruponewway.com.br
              </span>
              <button>...</button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
