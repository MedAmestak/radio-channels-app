import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function DeleteChannel() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    deleteChannel();
  }, []);

  const deleteChannel = async () => {
    try {
      await axios.delete(`/api/channels/${id}`);
      history.push('/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Delete Channel</h1>
      <p>Channel deleted successfully.</p>
    </div>
  );
}

export default DeleteChannel;
