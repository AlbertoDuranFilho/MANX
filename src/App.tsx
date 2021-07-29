import ReconnectingWebSocket from 'reconnecting-websocket';

import { AnalogProvider } from './contexts/AnalogContext';
import { DateProvider } from './contexts/DateContext';
import { ToogleProvider } from './contexts/ToogleContext';
import { Dashboard } from "./pages/dashboard";

export const socket = new ReconnectingWebSocket('ws://192.168.1.253:80');

function App() {

  return (
    <div className="App">
      <AnalogProvider>
        <ToogleProvider>
          <DateProvider>
            <Dashboard />
          </DateProvider>
        </ToogleProvider>
      </AnalogProvider>
    </div>
  );
}

export default App;
