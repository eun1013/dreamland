
import MyPage from "../components/MyPage/MyPage";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPageMobile from "../mobile/MainPageMobile";
import MobileReservation from "../mobile/MobileReservation";
import { useEffect, useState } from "react";
import HeaderMobile from "../mobile/HeaderMobile";
import BottomNavBarMobile from "../mobile/BottomNavBarMobile";
import Login from "../mobile/Login";
import AgreeMent from "../mobile/AgreeMent";
import SignUp from "../mobile/SignUp";
import SignUpComplete from "../mobile/SignUpComplete";
import FindID from "../mobile/FindID";
import FindIDNo1 from "../mobile/FindIDNo1";
import FindPW from "../mobile/FindPW";
import ResetPw from "../mobile/ResetPw";
import ChangedPw from "../mobile/ChangedPw";
import Information from "../mobile/Information";
import IntroMobile from "../mobile/IntroMobile";


const MobilePage = () => {
  const [userID,setUserID] = useState('');
  const [id,setId] = useState(null);
  const [nameOfPage,setNameOfPage] = useState('');
  const location = useLocation();
  useEffect(()=>{
    const path = location.pathname;
    if(path === '/login'){
      setNameOfPage('로그인');
    } else if(path === '/agreement' || path === '/signup' || path === '/signupComplete'){
      setNameOfPage('회원가입')
    } else if(path.includes("/findid")){
      setNameOfPage('아이디 찾기')
    } else if(path.includes('/findpw')){
      setNameOfPage('비밀번호 변경')
    } else if(path.includes("/mypage")){
      if(path === '/mypage'){
        setNameOfPage('마이페이지');
      }
      if(path.includes("/password-check")){
        setNameOfPage('비밀번호변경');
      }
      if(path.includes("/membership")){
        setNameOfPage('연간회원권 등록');
      }
      if(path.includes("/reservation")){
        setNameOfPage('내 예약 내역');
      }
    } else if(path.includes("/MobileReservation")){
      setNameOfPage('예약하기')
    }else if(path === "/information"){
      setNameOfPage('사이트 정보')
    }
  },[location.pathname])
  return (
    <div className="mobile-page">
      <HeaderMobile pageName={nameOfPage}/>
      <Routes>
        <Route path="/" element={<MainPageMobile />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mypage/*" element={<MyPage/>}/>
        <Route path="/agreement" element={<AgreeMent/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signupComplete" element={<SignUpComplete/>}/>
        <Route path="/findid" element={<FindID setUserID={setUserID}/>}/>
        <Route path="/findidno1" element={<FindIDNo1 userID={userID}/>}/>
        <Route path="/findpw" element={<FindPW setID={setId}/>}/>
        <Route path="/findpw/resetpw" element={<ResetPw ID={id}/>}/>
        <Route path="/findpw/changedpw" element={<ChangedPw/>}/>
        <Route path="/information" element={<Information/>}/>
        <Route path="/intro" element={<IntroMobile/>}/>
        <Route path="MobileReservation/*" element={<MobileReservation />}/>
      </Routes>
      <BottomNavBarMobile/>
    </div>
  );
};

export default MobilePage;