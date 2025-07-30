import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BottomNavBarMobile from "./BottomNavBarMobile";
import { FaRegCalendarAlt } from "react-icons/fa";
import "../styles//mobile/CalendarStyle.scss";

const ScheduleSelect = () => {
  const navigate = useNavigate();

  // 로컬 스토리지에 저장된 날짜 불러오기 (없으면 오늘 날짜)
  const today = new Date();
  const storedDate = localStorage.getItem("selectedDate");
  const initialDate = storedDate ? new Date(storedDate) : today;
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const maxDate = moment(today).add(30, "days").toDate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };

  const handleReserve = () => {
    navigate("/MobileReservation/floor");
  };

  return (
    <div className="ScheduleSelect">
      <h2 className="title">
        <FaRegCalendarAlt />
        예약 날짜 선택
      </h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}          // 기본값: 세이브 데이터 or 오늘 날짜
        minDate={today}
        maxDate={maxDate}
        defaultActiveStartDate={today}
        view="month"
        maxDetail="month"
        minDetail="month"
        prev2Label={null}
        next2Label={null}
        calendarType="gregory"
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (
            view === "month" &&
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            return <div className="today-text">오늘</div>;
          }
          return null;
        }}
      />

      <ul className="state">
        <li>
          <span></span>예약 가능
        </li>
        <li>
          <span></span>잔여 수량 없음
        </li>
        <li>
          <span></span>미운영/준비중
        </li>
      </ul>
      <button className="reserve-btn" onClick={handleReserve}>
        예약하기
      </button>
      <BottomNavBarMobile />
    </div>
  );
};

export default ScheduleSelect;