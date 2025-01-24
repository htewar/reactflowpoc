import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss';
import App from './App.tsx'
import { Provider } from 'react-redux';

import { store, persistor } from './redux/store/configureStore.ts';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes/AppRoutes.tsx';

const connectedComponents = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {connectedComponents}
  </StrictMode>,
)
