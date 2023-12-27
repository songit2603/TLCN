import "@/src/styles/index.scss";
import '../assets/css/style.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../src/slices';
import { startSession } from '../slices/thunks';
//imoprt Route
//import Route from '../Routes';
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
const store = configureStore({ reducer: rootReducer, devTools: true });
store.dispatch(startSession());
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} suppressHydrationWarning={true} />
    </Provider>
  );
}
