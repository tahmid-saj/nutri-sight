import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  regularButton: "regular-button"
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonType === "regularButton" ? "button-rounded" : ""} 
                      ${BUTTON_TYPE_CLASSES[buttonType]}`} { ...otherProps }>
      { children }
    </button>
  );
};

export default Button;