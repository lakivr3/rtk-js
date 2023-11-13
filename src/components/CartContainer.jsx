import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, Total } from "../features/cart/cartSlice";
import { closeModal, openModal } from "../features/modal/modalSlice";
import CartItem from "../components/CartItem";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const disptach = useDispatch();
  useEffect(() => {
    disptach(Total());
  }, [cartItems]);
  if (amount < 1) {
    return (
      <>
        <section className="cart">
          <header>
            <h2>your bag</h2>
            <h4 className="empty-cart">is currently empty</h4>
          </header>
        </section>
      </>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => disptach(openModal())}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
