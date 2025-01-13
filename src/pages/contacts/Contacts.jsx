import { BASE_URL } from '../../data/constants';

import { useEffect, useState } from 'react';
import { dateFormater } from '../../utils/dateFormater';
import { inputHandlePhoneChange } from '../../utils/phoneMask';
import { DateComponent } from '../../components/DateComponent';

export const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const currentDate = new Date();

  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevsetFormData) => ({
      ...prevsetFormData,
      [id]: value,
    }));
  };

  const getFilteredContacts = async () => {
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`${BASE_URL}/contacts/?${queryString}`);
    const data = await response.json();
    setContacts(data);
  };

  const getAllCompanyContacts = async () => {
    const response = await fetch(`${BASE_URL}/contacts/`);
    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    setFormData({
      startDate: firstDayOfCurrentMonth.toLocaleDateString('en-CA'),
      endDate: lastDayOfCurrentMonth.toLocaleDateString('en-CA'),
    });
  }, []);

  useEffect(() => {
    getAllCompanyContacts();
  }, []);

  return (
    <div className='text-black h-screen w-screen  p-5 bg-slate-50'>
      <h1 className='font-bold text-2xl text-center mb-4'>Contacts</h1>
      <div className='flex flex-row w-full justify-center'>
        <button onClick={getFilteredContacts}>Buscar Contato</button>
        <div className='flex items-center flex-col justify-start'>
          <div className='flex items-start flex-col m-2'>
            <label htmlFor='name'>Nome padrão:</label>
            <input
              className='rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
              id={'name'}
              type='text'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='flex items-start flex-col  m-2'>
            <label htmlFor='phone'>Telefone:</label>
            <div>
              <input
                id='phoneAreaCode'
                type='text'
                className='w-10 rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
                maxLength={2}
                defaultValue={55}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                id={'phone'}
                className='w-36 rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
                placeholder='(00) 00000-0000'
                type='tel'
                onChange={(e) => inputHandlePhoneChange(e)}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col '>
          <div className='flex flex-col m-2'>
            <label htmlFor='editedName'>Nome Editado:</label>
            <input
              onChange={(e) => handleInputChange(e)}
              className='rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
              id={'editedName'}
              type='text'
            />
          </div>
          <div className='flex flex-col m-2'>
            <label htmlFor='cpf'>CPF:</label>
            <input
              className='rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
              id={'cpf'}
              placeholder='000.000.000.00'
              type='text'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className=''>
          <div className='flex flex-col m-2'>
            <label htmlFor='email'>Email:</label>
            <input
              className='rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
              id={'email'}
              type='email'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='startDate'>Data Inicial:</label>
            <input
              id='startDate'
              className=' text-black rounded-md shadow-inner-xl px-2 py-2  bg-white'
              type='date'
              value={formData.startDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-col m-2'>
            <label htmlFor='tags'>Tags:</label>
            <input
              className='rounded-md shadow-inner-xl px-2 py-2 ml-2 bg-white select-none outline-none'
              id={'tags'}
              type='text'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='endDate'>Data Final:</label>
            <input
              id='endDate'
              className=' text-black rounded-md shadow-inner-xl px-2 py-2  bg-white'
              type='date'
              value={formData.endDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </div>

      <div className='px-4 pt-10 shadow-inner'>
        {contacts?.map((contact, index) => (
          <div
            key={index}
            className='
            flex 
            justify-between 
            shadow-md 
            rounded-md 
            items-center 
            min-h-[50px]'
          >
            <div className='px-2'>{contact.name}</div>
            <div className='px-2'>{contact.phone}</div>
            <div className='px-2'>
              {contact.type ? contact.type : 'Sem tipo'}
            </div>
            <div className='px-2'>{dateFormater(contact.created_at)}</div>
            <div className='px-2'>{dateFormater(contact.updated_at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
