export const Ticket = ({ data }) => {
    return (
      <div className="ticket" role="region" aria-label="Generated Conference Ticket">
        <div className="ticket-header">
          <h2>Conference Ticket</h2>
        </div>
        <div className="ticket-content">
          <div className="avatar-container">
            <img src={data.avatarUrl} alt={`${data.fullName}'s avatar`} />
          </div>
          <div className="ticket-details">
            <p><strong>Name:</strong> {data.fullName}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        </div>
      </div>
    );
  };
  
  