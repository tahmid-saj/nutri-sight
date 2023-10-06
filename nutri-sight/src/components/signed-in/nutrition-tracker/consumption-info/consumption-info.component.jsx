import "./consumption-info.styles.scss";

const ConsumptionInfo = ({ searchedDay }) => {
  return (
    <div className="consumption-info">
      <h5>{`On ${searchedDay}`}</h5>

      <h4>{`Total calories consumption   `}<h3><strong>{`${2300}`}</strong></h3></h4>
      <h4>{`Total carbohydrate consumption   `}<h3><strong>{`${900}`}</strong></h3></h4>
      <h4>{`Total protein consumption   `}<h3><strong>{`${700}`}</strong></h3></h4>
      <h4>{`Total fat consumption   `}<h3><strong>{`${600}`}</strong></h3></h4>

      <h3>Micronutrients</h3>
      <h4>{`Total iron consumption   `}<h3><strong>{`${60}`}</strong></h3></h4>
    </div>
  );
};

export default ConsumptionInfo;