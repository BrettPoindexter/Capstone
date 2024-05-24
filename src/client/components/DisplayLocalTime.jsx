import React from 'react';

const DisplayLocalTime = ({ utcTimestamp }) => {
  // Convert UTC timestamp to local Date object
  const localDate = new Date(utcTimestamp);

  // Get local date and time strings
  const localDateString = localDate.toLocaleDateString();
  const localTimeString = localDate.toLocaleTimeString();

  return (
    <div>
      <p>Created on: {localDateString} at {localTimeString}</p>
    </div>
  );
};

export default DisplayLocalTime;
