// src/App.jsx
import { useState } from 'react';
import { ConferenceTicketForm } from './components/ConferenceTicketForm';
import { Ticket } from './components/Ticket';
import './styles/App.css';

function App() {
  const [ticketData, setTicketData] = useState(null);

  const handleFormSubmit = (data) => {
    setTicketData(data);
  };

  return (
    <div className="container">
      <ConferenceTicketForm onSubmit={handleFormSubmit} />
      {ticketData && <Ticket data={ticketData} />}
    </div>
  );
}

export default App;