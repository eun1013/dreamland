import { PiWarningCircleFill, PiWarningFill } from "react-icons/pi";

const InfoPrice = () => {
  return (
    <div className="info-price" style={{backgroundImage: "url('/images/info-background.png')"}}>
      <div className="price-content">
        <div className="content-title">
          <img src={`${process.env.PUBLIC_URL}/images/Parking.svg`} alt="icon" />
          <h3>주차 요금</h3>
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/info-price.png`} />
        <div className="content-ment">
          <span><PiWarningFill /> 주의사항</span>
          <p>사전 예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
          <p>입차 후 20분 이내 출차 시 무료예요</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPrice;