import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChannelList() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('/api/channels');
      setChannels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Channel List</h1>
      <ul>
        {channels.map((channel) => (
          <li key={channel._id}>
            {channel.Nom} - {channel.Frequence} - {channel.Nbre_user}{' '}
            <Link to={`/edit/${channel._id}`}>Edit</Link>{' '}
            <Link to={`/delete/${channel._id}`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelList;
