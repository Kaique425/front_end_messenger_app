import { useState, useRef, useEffect } from 'react';
import { Attendance } from '../../components/Attendance/index';
import { SendHSMPopUp } from '../../components/SendHSMPopUp/index';
import { AttendanceItem } from '../../components/AttendanceItem';
import { BASE_URL, WS_BASE_URL } from '../../data/constants';
import { SendActiveIcon } from '../../Icons/SendActiveIcon';
import { MessageNotificationBell } from '../../Icons/MesssageNotificationBell';
import './style.css';

function Chat() {
  const [showHSMModal, setShowHSMModal] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [currentAttendanceInfos, setCurrentAttendanceInfos] = useState({});
  const [Attendances, setAttendances] = useState({});
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState({});
  const [FilteredAttendances, setFilteredAttendances] = useState([]);

  const handlesAttendanceOpening = (attendanceItem) => {
    setShowAttendance(true);
    setCurrentAttendanceInfos(attendanceItem);
  };
  const getSectors = async () => {
    const response = await fetch(`${BASE_URL}/sectors/`);
    const data = await response.json();
    setSectors(data);
    setSelectedSector(data[0]);
  };

  const getAttendances = async () => {
    try {
      let response = await fetch(`${BASE_URL}/attendances/`);
      let data = await response.json();

      const attendanceMap = data.reduce((accumulator, attendance) => {
        if (attendance.id) {
          accumulator[attendance.id] = attendance;
        } else {
          console.error('Atendimento sem ID:', attendance);
        }
        return accumulator;
      }, {});

      setAttendances(attendanceMap);
    } catch (error) {
      console.error('Erro ao obter atendimentos:', error);
    }
  };

  const updateAttendance = (attendanceChange) => {
    setAttendances((prevAttendance) => ({
      ...prevAttendance,
      [attendanceChange.id]: attendanceChange,
    }));
  };

  useEffect(() => {
    if (selectedSector.id) {
      const filtered = Object.values(Attendances)?.filter(
        (attendance) =>
          attendance &&
          attendance.sector === selectedSector.id &&
          attendance.is_closed !== true,
      );
      setFilteredAttendances(filtered);
    }
  }, [Attendances, selectedSector]);

  useEffect(() => {
    getAttendances();
    getSectors();

    let url = `${WS_BASE_URL}/ws/socket-server/dashboard/1`;
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (data.type === 'attendance_notification') {
        const attendanceChange = JSON.parse(data.message);
        updateAttendance(attendanceChange);
      }
      return () => {
        ws.close();
      };
    };
  }, []);

  const handleAttendanceClosing = () => {
    setShowAttendance(false);
  };

  return (
    <div className='attendance-painel-container'>
      <div className='attendance-painel-main'>
        <div className='painel-header-container'>
          {sectors?.map((sector) =>
            sector.id === selectedSector.id ? (
              <div className='sector selected-sector' key={sector.id}>
                <strong>{sector.name}</strong>
              </div>
            ) : (
              <div
                className='sector'
                onClick={() => setSelectedSector(sector)}
                key={sector.id}
              >
                <strong>{sector.name}</strong>
              </div>
            ),
          )}
          <div className='message-notification-bell-div'>
            <MessageNotificationBell />
          </div>
          <button
            className='flex bg-black text-white rounded-md p-2 items-end'
            onClick={() => setShowHSMModal(true)}
          >
            Enviar Modelo
            <SendActiveIcon />
          </button>
          {showHSMModal && (
            <SendHSMPopUp setShowHSMPopUp={setShowHSMModal} isCreation={true} />
          )}
        </div>
        <div className='attendance-painel'>
          <div className='search-attendance-container'>
            <input className='input-search' type='text' />
            <div className='filters-container'>
              <div className='filter-item'>Lido</div>
              <div className='filter-item'>Novo</div>
              <div className='filter-item'>Pendente de Resposta</div>
              <div className='filter-item'>Agendados</div>
              <div className='filter-item'>Automático</div>
            </div>
          </div>
          <div>
            <div className='attendances-container'>
              {FilteredAttendances?.map((attendanceItem) => (
                <AttendanceItem
                  key={attendanceItem.id}
                  attendanceItem={attendanceItem}
                  openAttandance={handlesAttendanceOpening}
                />
              ))}
            </div>
          </div>
          {showAttendance && (
            <Attendance
              sectors={sectors}
              OnCloseAttendance={handleAttendanceClosing}
              AttendanceInfo={currentAttendanceInfos}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
