import {  NavLink, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";
import { MdMore } from "react-icons/md";
import { RiYoutubeFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";

const LeftNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="left-nav">
      <nav className="top">
        <div className="logo">
          <img
            onClick={() => navigate("/")}
            className="logo"
            src={`${process.env.PUBLIC_URL}/images/dreamland_logo1.png`}
          />
        </div>
        <ul className="bottom-nav">
  <NavLink
    to="/"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <li>
      <TiHome className="icon" />
      <span>홈</span>
    </li>
  </NavLink>

  <NavLink
    to="/MobileReservation/schedule"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <li>
      <FaCar className="icon" />
      <span>예약하기</span>
    </li>
  </NavLink>

  <NavLink
    to="/mypage/reservation"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <li>
      <HiTicket className="icon" />
      <span>예약 내역</span>
    </li>
  </NavLink>

  <NavLink
    to="/info"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <li>
      <HiInformationCircle className="icon" />
      <span>주차 안내</span>
    </li>
  </NavLink>

  <NavLink
    to="/information"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <li>
      <MdMore className="icon" />
      <span>더보기</span>
    </li>
  </NavLink>
</ul>
      </nav>

      <div className="dreamland-info">
        <div className="footer-top">
          <div className="header" onClick={() => setIsOpen(!isOpen)}>
            <span className="title">DREAMLAND PARKING</span>
            <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
          </div>

          {isOpen && (
            <div className="details">
              <p>대표이사 : 아무개</p>
              <p>
                경기 수원시 팔달구 덕영대로 899
                <br />
                (매산로1가) 웹디몰산(주)
              </p>
              <p>통신판매업번호제 2014-수원팔달-0189호</p>
              <p>사업자번호 113-91-12270</p>
            </div>
          )}
        </div>
        <div className="line"></div>
        <div className="footer-bottom">
          <ul className="icon-list">
            <li>
              <RiYoutubeFill />
            </li>
            <li>
              <FaFacebookSquare />
            </li>
            <li>
              <FaSquareXTwitter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
