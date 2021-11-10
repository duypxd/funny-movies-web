import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import RoutersMain from "./routes";
import { store } from "./redux/Store";

const persistor = persistStore(store);

const App = (props: any) => (
  <Provider store={store}>
    <PersistGate loading={false} persistor={persistor}>
      <RoutersMain {...props} />
    </PersistGate>
  </Provider>
);

export default App;
