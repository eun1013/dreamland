import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";


  // localStorage 저장 "시작시간"  
    const saveStartTime = (startTime) => {
    localStorage.setItem("start_time", JSON.stringify(startTime));
    }
  // localStorage 저장 "종료시간"
    export const saveEndTime = (endTime) => {
    localStorage.setItem("end_time", JSON.stringify(endTime));
    }
  // localStorage 저장 "총 금액"
    export const saveTotal = (total) => {
    localStorage.setItem("total", JSON.stringify(total));
    }
  // localStorage 저장 "총 시간"
    export const saveHourAndMinutes = (hourAndMinutes) => {
    localStorage.setItem("hourAndMinutes", JSON.stringify(hourAndMinutes));
    }


const ReservesAllDay = ({reservation}) => {
  const [startTime, setStartTime] = useState('00:00'); // 시작 시간관리
  const [endTime, setEndTime] = useState('23:59'); // 종료 시간관리
  const [hourAndMinutes, setHourAndMinutes] = useState("24시간")
  const [total, setTotal] = useState(15000); // 일 최대 요금
  const [popUp, setPopUp] = useState(false); // 팝업 상태 관리

  const navigate = useNavigate();

    // 로컬 스토리지에 저장된 날짜 불러오기 (없으면 오늘 날짜)
  const today = new Date();
  const storedDate = localStorage.getItem("selectedDate");
  const initialDate = storedDate ? new Date(storedDate) : today;
  const [selectedDate, setSelectDate] = useState(initialDate);

  // 로컬 스토리지에 저장된 구역,자리 불러오기
  const storedZone = localStorage.getItem("selectedZone");
  const [selectedZone, setSelectedZone] = useState(storedZone);
  // const storedZoneSeats = localStorage.getItem("selectedZoneSeats");
  // const [selectedZoneSeats, setSelectedZoneSeats] = useState(storedZoneSeats);
  // const storedSeatID = localStorage.getItem("selectedSeatID");
  // const [selectedSeatID, setselectedSeatID] = useState(storedSeatID);

  // 좌석 데이터 가져오기
  const storedZoneSeatsString = localStorage.getItem("selectedZoneSeats");
  const storedSeatID = localStorage.getItem("selectedSeatID");
  
  // JSON 파싱
  const parsedZoneSeats = storedZoneSeatsString ? JSON.parse(storedZoneSeatsString) : null;
  const parsedSeatID = storedSeatID ? JSON.parse(storedSeatID) : null;

  // 상태 설정
  const [selectedSeatID, setselectedSeatID] = useState(parsedSeatID);
  const [selectedSeatNum, setSelectedSeatNum] = useState(null);

  // allSeatsData 추출
  let allSeatsData = [];
  if (parsedZoneSeats && parsedZoneSeats.allSeatsData) {
    allSeatsData = parsedZoneSeats.allSeatsData;
  }
 // 컴포넌트 마운트 시 좌석 번호 찾기
  useEffect(() => {
    // if (selectedSeatID && allSeatsData.length > 0) {
    //   const foundSeat = allSeatsData.find(seat => seat.id === selectedSeatID);
    //   if (foundSeat) {
    //     setSelectedSeatNum(foundSeat.num);
    //   }
    // }
    if(localStorage.getItem("selectedSeatID")){
      setselectedSeatID(localStorage.getItem("selectedSeatID"));
    }
    window.scrollTo(0,0);
  }, []);

  // 좌석 선택 함수
  const selectSeats = (seatID) => {
    const selectedSeat = allSeatsData.find(seat => seat.id === seatID);
    
    if(selectedSeat) {
      setselectedSeatID(seatID);
      setSelectedSeatNum(selectedSeat.num);
    }
  }

   //↓↓ 다음 버튼을 클릭했을 때 처리
  const handleClick = ()=>{
    saveStartTime(startTime);
    saveEndTime(endTime);
    saveTotal(total);
    saveHourAndMinutes(hourAndMinutes);
    navigate('/MobileReservation/payment') //다음페이지로 넘겨주기
  }

  const selectDay = (()=>{
    return reservation.selectedDate ? 
            reservation.selectedDate.toLocaleDateString("ko-KR",{
            month: 'long', 
            day: 'numeric'
            })
          : ""
  })

  return (
    <div className="reserves-day">
      <div className={`pop ${popUp ? "active" : ''}`}>
        <div className="pop-up">
        <p><PiWarningCircleFill /></p>
        <p>결제를 처리할 수 없습니다</p>
        <button onClick={()=>{setPopUp(false)}}>닫기</button>
         </div>
      </div>
      <div className="day-title">
        <p className="day-date">
          <FaRegCalendarAlt />  {selectedDate ? 
          selectedDate.toLocaleDateString("ko-KR",{
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })
          : "날짜를 선택해주세요"}
        </p>
        <h2><GoClockFill /> 이용시간 선택</h2>
      </div>
      <div className="day-seat">
        <p>선택한자리</p>
        <h1>{selectedZone} - {selectedSeatID ? `${selectedSeatID}` : "선택된 좌석이 없습니다"}</h1>
      </div>
      <div className="day-btn">
        <button
        onClick={()=>{navigate('/MobileReservation/Time')}}
        ><GoClockFill /> 시간제</button>
        <button
          onClick={() => { navigate('/MobileReservation/AllDay') }}
        ><FaRegCalendarAlt /> 일일권</button>
      </div>
      <div className="day-day">
        <p>선택한 날짜</p>
        <p>
          {selectedDate ? 
          selectedDate.toLocaleDateString("ko-KR",{
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
            })
          : ""} 
        </p>
      </div>
      <div className="day-time">
        <p>이용시간</p>
        <p>{selectDay()} {startTime} - {selectDay()} {endTime}</p>
      </div>
      <div className="day-info">
        <h5><PiWarningFill /> 주차장 이용 안내</h5>
        <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
        <p>최초 1시간 2,000원 이후 30분당 1,000원이 부과돼요</p>
      </div>
      <div className="day-price">
        <p><span>일일권</span> 이용 금액</p>
        <h5>{total.toLocaleString("ko-KR")}원</h5>
      </div>
      <button
        onClick={handleClick}
        className="day-nextBtn"
      >다음으로</button>
    </div>
  );
};

export default ReservesAllDay;
