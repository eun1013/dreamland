
const InfoMap = () => {
  return (
    <div className="info-map" style={{backgroundImage: "url('/images/info-background.png')"}}>
      <div className="map-content">
        <img src={`${process.env.PUBLIC_URL}/images/info-map.png`} />
      </div>
    </div>
  );
};

export default InfoMap;