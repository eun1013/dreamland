
import MyPage from "../components/MyPage/MyPage";
import { Route, Routes } from "react-router-dom";
import MainPageMobile from "../mobile/MainPageMobile";
import MobileReservation from "../mobile/MobileReservation";
import { useState } from "react";
import HeaderMobile from "../mobile/HeaderMobile";
import BottomNavBarMobile from "../mobile/BottomNavBarMobile";


const MobilePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedZoneSeats, setSelectedZoneSeats] = useState([]);
  const [selectSeatID, setSelectSeatID] = useState(null);
  //날짜, 구역, 좌석 상태 관리
  const reservationState = {
    selectedDate,
    setSelectedDate,
    selectedZone,
    setSelectedZone,
    selectedZoneSeats,
    setSelectedZoneSeats,
    selectSeatID,
    setSelectSeatID    
  };
  //메인페이지 -> 예약페이지
  return (
    <div className="mobile-page">
      {/* <MyPage /> */}
      <HeaderMobile />
      <Routes>
        <Route path="/" element={<MainPageMobile />}/>
        <Route path="MobileReservation/*" element={<MobileReservation />}/>
      </Routes>
      <BottomNavBarMobile/>
    </div>
  );
};

export default MobilePage;