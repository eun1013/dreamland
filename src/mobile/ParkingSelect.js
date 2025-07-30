import  { useEffect, useState } from "react"; 
import { useNavigate } 
from "react-router-dom";
import IconTitle from "./IconTitle";
import { FaCarSide } from "react-icons/fa6";
import SeatIcon from "./SeatIcon";

// 전체 구성 순서 요약
// - 로컬스토리지에서 selectedZone과 selectedZoneSeats 가져오기
// - selectedZone, selectedZoneSeats, selectSeatID 상태 관리
// - 좌석 예약 상태 확인 함수 정의
// - 좌석 클릭 시 선택 처리 (handleSeatClick)
// - 좌석 색상 결정 함수 (getSeatColor)
// - 좌석을 3개 구간으로 나누기
// - 예약 가능 여부 안내 (noticeItems)
// - 좌석 배경 색상 결정 함수 (getSeatBackgroundColor)
// - nextbtn 버튼 클릭 시 선택된 좌석을 확인하고 Time 페이지로 이동
// - 선택된 자리 버튼 표시


//로컬스토리지에서 selectedDate 가져오기
const ParkingSelect = ({  }) => {
  // selectedZone selectedZoneSeats selectedID 상태 관리
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedZoneSeats, setSelectedZoneSeats] = useState([]);
  const [selectSeatID, setSelectSeatID] = useState(null);

   // 2. 로컬스토리지에서 데이터 가져오기
  useEffect(() => {
    const parkZone = localStorage.getItem("selectedZone");
    const parkSeats = localStorage.getItem("selectedZoneSeats");
    const selectedSeatID = localStorage.getItem("selectedSeatID");

    if( parkZone && parkSeats ) {
      setSelectedZone(parkZone);
      setSelectedZoneSeats(JSON.parse(parkSeats));

    if( selectedSeat ){
      setSelectSeatID(parseInt(selectedSeatID, 10)); //선택한 좌석 유지(숫자로 변환)
    }
    }
    // console.log("Select Seat ID after setSelectSeatID:", selectSeatID);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  // **selectedDate를 localStorage에서 가져와서 selectedDate로 저장
  const storedDate = localStorage.getItem("selectedDate");
  const selectedDate = storedDate ? new Date(storedDate) : null;  

  // 3. 예약 상태 확인
  const { allSeatsData = [], reserveID = [], myReserved = [] } = selectedZoneSeats || {};

  const isReserved = (seat) => reserveID.includes(seat.id); //reserveID는 이미 예약된 좌석을 의미, seat_id가 reserveID 안에 있는지 확인(있으면 true)
  const isMyReserved = (seat) => myReserved.includes(seat.id); //myReserved는 내가 예약한 좌석을 의미, seat_id가 myReserved는 안에 있는지 확인(있으면 true)

  // 예약이 가능한 seat만 선택이 되게 하는 함수(예약중, 예약불가능은 클릭 안됨)
  const handleSeatClick = (seat) => {
    // console.log("seat ID:", seat.id);
    if (!seat.is_reserved) {
      setSelectSeatID(seat.id);
      localStorage.setItem("selectedSeatID", seat.id.toString()); //선택된 좌석을 로컬스토리지에 저장
    }
  };

  // 4. 좌석 색상 함수
  const getSeatColor = (seat) => {
    // console.log("Selected Seat ID:", selectSeatID);
    if (isMyReserved(seat)) return "#ffffff"; //내 예약 색상
    if (seat.id === selectSeatID) return "#FFF098"; //현재 선택한 색상
    if (isReserved(seat)) return "#E4E3E6"; //예약 불가 색상
    return "#BD6CE3"; //예약 가능 색상
  };

  // 5. seat 3개 구간으로 나누기
  const oneRow = allSeatsData.filter((seat) => {
    return seat.num >= 1 && seat.num <= 10;
  });
  const twoRow = allSeatsData.filter((seat) => {
    return seat.num >= 11 && seat.num <= 20;
  });
  const threeRow = allSeatsData.filter((seat) => {
    return seat.num >= 21 && seat.num <= 25;
  });

  // 6. 상단 예약 가능 여부 안내 변수
  const noticeItems = [
    { label: "예약 불가능", backgroundColor:"#EFEFEF", color: "#DDDDDD"},
    { label: "예약 가능", backgroundColor:"#FFFEFF", color: "#BD6CE3", border: "1px solid #BAB6C3"},
    { label: "내 예약", backgroundColor:"#DCD5E8", color: "#FFFEFF"},
    { label: "현재 선택", backgroundColor:"#BD6CE3", color: "#FFF098"},
  ];

  // 7. svg아이콘 색상용 함수
  const getSeatBackgroundColor = (seat)=>{
    if (isMyReserved(seat)) return "my-reserve"; //내 예약 색상
    if (seat.id === selectSeatID) return "selected"; //현재 선택한 색상
    if (isReserved(seat)) return "reserve"; //예약 불가 색상
    return "available"; //예약 가능 색상
  }
  
  const navigate = useNavigate();

  // 8. reserveTime페이지로 넘어가는 다음으로 버튼
  const nextbtn = () => {
    if (!selectSeatID) {
      alert("주차 자리를 선택해주세요");
      return;
    }
    navigate("/MobileReservation/Time")
  }

// 9. 선택된 자리 버튼
// allSeatsData에서 해당 좌석을 찾아
// 사용자에게 보여줄 num(좌석 번호)을 따로 추출함
  const selectedSeat = allSeatsData.find( (seat)=>{
    return seat.id === selectSeatID });
  const displayNum = selectedSeat ? selectedSeat.num : "";

  // console.log(oneRow);
  // console.log('selectedZone:', selectedZone);
// console.log(allSeatsData);
// console.log("reserveID:", reserveID);
// console.log("myReserved:", myReserved);
  return (
    <div className="parking-select">
      <IconTitle title={`${selectedZone}구역 주차 자리 선택`} selectedDate={selectedDate}/>

      <div className="reserve-notice">
        {noticeItems.map(({label, backgroundColor, color, border}, idx)=>{
          return (<div 
            key={idx} className="notice-icon-wrap">
            <div className="notice-icon" style={{ backgroundColor, border }}>
              <FaCarSide style={{ color }}/>
            </div>
            <span>{label}</span>
          </div>)
        })}
      </div>

{/* 3개 구간 나눈 변수를 map으로 뿌려주기 */}
    <div className="seat-wrapper">
      {[oneRow, twoRow, threeRow].map((row, idx) => {
        return (
          <div className="seat-grid" key={idx}>
            {row.map((seat) => {
// console.log(seat.num, getSeatBackgroundColor(seat));
              return (
                <div
                  key={seat.id}
                  className={`seat ${getSeatBackgroundColor(seat)}`}
                  onClick={() => { handleSeatClick(seat)}}
                  >
                  <SeatIcon color={getSeatColor(seat)}/>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>

      <div>
        <button> <span>선택한 자리</span> {selectedZone}-{displayNum}</button>
        <button className="next-btn" onClick={nextbtn}> 다음으로 </button>
      </div>
    </div>
  );
};

export default ParkingSelect;
