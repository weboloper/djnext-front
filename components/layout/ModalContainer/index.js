import React from "react";
const ModalContainer = ({ children, id }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={id}
      aria-hidden="true"
    >
      <div className="modal-dialog">{children}</div>
    </div>
  );
};

export default ModalContainer;
