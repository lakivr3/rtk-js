import React from "react";
import { closeModal, openModal } from "../features/modal/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

function Modal() {
  const { isOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  if (!isOpen) return null;
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal;
