import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useEffect } from "react";
import { getCartItems } from "./features/cart/cartSlice";

function App() {
  const { isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Modal />
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
