import "./summary.styles.scss";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Summary = () => {
  return (
    <div className="nutrition-tracker-summary">
      <h5>{`As of ${currentDate}`}</h5>

      <h4>{`Average daily calories consumption   `}<h3><strong>{`${2300}`}</strong></h3></h4>
      <h4>{`Average daily carbohydrate consumption   `}<h3><strong>{`${900}`}</strong></h3></h4>
      <h4>{`Average daily protein consumption   `}<h3><strong>{`${700}`}</strong></h3></h4>
      <h4>{`Average daily fat consumption   `}<h3><strong>{`${600}`}</strong></h3></h4>
    </div>
  );
};

export default Summary;