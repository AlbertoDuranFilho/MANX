import ReconnectingWebSocket from 'reconnecting-websocket';

import { AnalogProvider } from './contexts/AnalogContext';
import { DateProvider } from './contexts/DateContext';
import { TableProvider } from './contexts/TableContext';
import { ToogleProvider } from './contexts/ToogleContext';
import { Dashboard } from "./pages/dashboard";

export const socket = new ReconnectingWebSocket('wss://192.168.1.253:80');

function App() {

  return (
    <div className="App">
      <AnalogProvider>
        <ToogleProvider>
          <DateProvider>
            <TableProvider>
              <Dashboard />
            </TableProvider>
          </DateProvider>
        </ToogleProvider>
      </AnalogProvider>
    </div>
  );
}

export default App;
