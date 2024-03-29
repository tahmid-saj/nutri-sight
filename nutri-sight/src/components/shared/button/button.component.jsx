import "./button.styles.scss";

import { BUTTON_TYPE_CLASSES } from "../../../utils/constants/shared.constants";

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonType === "regularButton" ? "button-rounded" : ""} 
                      ${BUTTON_TYPE_CLASSES[buttonType]}`} { ...otherProps }>
      { children }
    </button>
  );
};

export default Button;