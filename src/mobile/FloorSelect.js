import "../styles/mobile/IconTitle.scss";
import IconTitle from "./IconTitle";
import { useEffect, useState } from "react";
import { getAllseatsByDate, loadZoneSeats } from "../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";

// 전체 구성 순서 요약
// - 선택한 날짜 selectedDate 가져오기 (localStorage)
//   날짜 없으면 alert 띄우고 뒤로 보내기

// - 선택된 구역 상태 저장 (selectedZone)

// - 구역별 잔여 좌석 수 가져오기 (getAllseatsByDate)

// - 특정 구역 클릭 시 자리 상세 데이터 요청 (loadZoneSeats)

// - 구역 상태에 따라 “쾌적/여유/혼잡” 표시

// - 다음 페이지로 이동 (/MobileReservation/parking)


const FloorSelect = ({ userID }) => {
  const navigate = useNavigate();

  //1. selectedDate를 localStorage에서 가져와서 selectedDate로 저장
  const storedDate = localStorage.getItem("selectedDate");
  const selectedDate = storedDate ? new Date(storedDate) : null;  


  //2. 저장된 날짜가 없으면 alert창 띄우고, 날짜 선택 페이지로 이동
  useEffect(() => {
    if (!selectedDate) {
    alert("날짜 정보가 없습니다. 예약 날짜를 다시 선택해주세요.");
    navigate("/MobileReservation/schedule");
    }
  }, []);


  //3. 상태와 로컬스토리지 연결(선택한 구역, 구역 자리 정보)
  const [selectedZone, setSelectedZone] = useState(() => {
    return localStorage.getItem("selectedZone") || "";
  });
  //LocalStorage에서 기존 값이 있으면 그걸 불러오고, 없으면 빈 값으로 시작
  const [selectedZoneSeats, setSelectedZoneSeats] = useState(()=>{
    const saved = localStorage.getItem("selectedZoneSeats");
    return saved ? JSON.parse(saved) : [];
  }); //해당 구역 자리 정보 배열

  // 선택되는 구역을 A,B,C,D로 저장
  const [zoneStatus, setZoneStatus] = useState({});
  // const [selectedZone, setSelectedZone] = useState(""); //구역 정보 관리(A,B,C,D)
  const zones = ["A", "B", "C", "D"]; //구역 선택용 배열

 // selectedZone 상태 변경 시 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("selectedZone", selectedZone);
  }, [selectedZone]);

// selectedZoneSeats 상태 변경 시 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("selectedZoneSeats", JSON.stringify(selectedZoneSeats));
  }, [selectedZoneSeats]);


  //4. 구역별 정보를 가져오는 함수(자리보여주기)_성공시 로컬스토리지에 저장
  const listArea = async (selectZone,selectDate,userID) => { 
    setSelectedZone(selectZone);
    const { data, error } = await loadZoneSeats(selectZone, selectDate, userID);
    if (error) {
      alert("주차 자리 정보 불러오기 실패");
      setSelectedZoneSeats([data.allSeatsData]);
      return;
    }
    setSelectedZoneSeats(data);
  };

  //5. 잔여석 정보 불러오기
  //날짜를 한국 날짜로 변환
  const realDate = selectedDate
    ? new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
    : null;

  // 페이지 로드 시 전체 구역의 잔여석 상태를 가져옴
  useEffect(() => { //값이 바뀔때마다 코드를 자동으로 실행
    // console.log("realDate:", realDate);
      if( !selectedDate ) return;

    //함수 정의 : api 불러오기
    const loadZoneStatus = async () => {
      // if( !selectedDate ) return; //날짜가 선택이 안되면 실행 x
    //날짜 잔여석 요청
      const { success, data, error } = await getAllseatsByDate(realDate);
      if( !success || error ){
        alert("잔여석 정보를 불러오는데 실패했습니다");
        return;
      }
      //잔여석을 불러오는데 성공 시 상태를 저장
      setZoneStatus(data);
    };
    loadZoneStatus();
  }, [realDate]);


  //6. 쾌적/여유/혼잡
  const getZoneStateLabel = (zone)=>{
    const data = zoneStatus[zone];  //해당 구역의 좌석 데이터를 가지고오기
      if( !data ) return "정보 없음";
    const level = data.available / data.total; //좌석 비율 계산
      if( level >= 0.7 ) return "쾌적";  //70% 이상
      if( level >= 0.4 ) return "여유";  //40%~70% 여유
    return "혼잡";
  }  


  //7. ParkingSelect 페이지로 넘어가는 버튼 함수
  const nextbtn = () => {
    //만약에 구역이 선택이 안되면
    if (!selectedZone) {
      alert("구역을 선택해주세요");
      return;
    }
    navigate("/MobileReservation/parking");
  };


  return (
    <div className="floor-select">

      <div className="top-zone">
        <IconTitle title="이용 구역 선택" selectedDate={selectedDate}/>
        <p className="zone-name">사전 결제 ZONE</p>

        {/* //zones 배열 abcd를 순회하며 list로 받아옴*/}
        <div className="zone-wrap">
        {zones.map((list) => {
          //상태 변수 : 각 배열 정보가 담김(아직 데이터가 없으면 0처리)
          const status = zoneStatus[list] || {
            total: 0,
            reserved: 0,
            available: 0,
          };
          return (

            <ul className="zone-select" >
              {/* 버튼을 클릭하면 해당 구역의 정보(배열)가 불러와지고, 총수와 잔여석 표기 */}
              <li
                key={list}
                onClick={() => { listArea(list, realDate, userID) }}>
                <div><span>{list}</span>구역</div> 
                <div>
                  <p>잔여석<span>{status.available}</span>/25</p>
                  <p><span className={`status-dot ${getZoneStateLabel(list)}`}></span>
                    {getZoneStateLabel(list)}
                  </p>
                </div>
              </li>
            </ul>
          );
        })}
        </div>

        <div className="price-info">
          <p className="price-title">요금 안내</p>
          <ul className="price-detail">
            <li>
              <span>최소 1시간</span>
              <span>2,000원</span>
            </li>
            <li>
              <span>이후 30분당</span>
              <span>1,000원</span>
            </li>
            <li>
              <span>일 최대 요금</span>
              <span>15,000원</span>
            </li>  
          </ul>
        </div>  

        <button className="next-btn" onClick={nextbtn}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default FloorSelect;
