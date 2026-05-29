import { CartProvider } from "../store/cartStore";

export default function AppCartProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}