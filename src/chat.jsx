import { useState, useRef, useEffect } from 'react'
import { Attendance } from "./components/Attendance/index"
import { SendHSMPopUp } from "./components/SendHSMPopUp/index"
import { AttendanceItem } from "./components/AttendanceItem"
import {BASE_URL} from "./constants"


function Chat() {
  const [showHSMModal, setShowHSMModal] = useState(false) 
  const [showAttendance, setShowAttendance ] = useState(false)
  const [currentAttendanceInfos, setCurrentAttendanceInfos] = useState({})
  const [Attendances, setAttedances] = useState([])
  const [sectors, setSectors ] = useState([])
  const [selectedSector, setSelectedSector] = useState({})
  
  const getSectors = async () => {
    const response = await fetch(`${BASE_URL}/sectors`)
    const data = await response.json()
    setSectors(data)
    setSelectedSector(data[0])
  }
  
  const getAttendances = async () => {
    let response = await fetch(`${BASE_URL}/attendances`)
    let data = await response.json()
    setAttedances(data)
  } 
  
  const handlesAttendanceOpening = (attendanceItem) => {
    setShowAttendance(true)
    setCurrentAttendanceInfos(attendanceItem)
  }
  
  useEffect( () => {
    getAttendances()
    getSectors()
  }, [])
  
  let filteredAttendances= []
  filteredAttendances = Attendances.filter( attendance => attendance.sector === selectedSector.id)
  
  
  const handleAttendanceClosing = () => {
    setShowAttendance(false)
  }
  
  
  return (
    <div className="attendance-painel-container">
      <div className="attendance-painel-main">
          <div className="painel-header-container" >
                { sectors?.map( (sector) => (
                    sector.id === selectedSector.id?
                      <div className="sector selected-sector" key={sector.id} >{sector.name}</div>:
                      <div className="sector" onClick={() => setSelectedSector(sector)} key={sector.id} >{sector.name}</div>
                    
                ))}

                <button className="send-hsm-button" onClick={() => setShowHSMModal(true)} >Send HSM</button>
                {showHSMModal && <SendHSMPopUp AttendanceInfo={{customer_phone_number:"5518996696477"}} setShowHSMPopUp={setShowHSMModal} />}
          </div>
          <div className="attendance-painel">
              <div>
                  <div className="attendances-container" >
                  { filteredAttendances.map( (attendanceItem) => (
                    <AttendanceItem key={attendanceItem.id} attendanceItem={attendanceItem} openAttandance={handlesAttendanceOpening} />
                  )) }
                    
                  
                  </div>
              </div>


              { showAttendance &&
                  <Attendance sectors={sectors} OnCloseAttendance={handleAttendanceClosing} AttendanceInfo={currentAttendanceInfos} />

              }
          </div>
        </div>
    </div>
  )
}

export default Chat
