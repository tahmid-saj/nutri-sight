import "./pagination.styles.scss";

import Button from "../../../button/button.component";

const Pagination = () => {
  return (
    <div className="pagination-container">
      <div className="pagination-buttons-container">
        <Button buttonType="regularButton" type="submit">{`< Page 1`}</Button>
        <Button buttonType="regularButton" type="submit">{`Page 3 >`}</Button>
      </div>
    </div>
  );
};

export default Pagination;
