import React, { useState } from "react";


const CheckBox = (props) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <button
      type="button"
      onClick={() => {
        setIsActive(!isActive);
        props.onClick();
      }}
      className={isActive ? props.isActiveClass : props.isInactiveClass}
    >
      {props.children}
    </button>
  );
};

export default CheckBox