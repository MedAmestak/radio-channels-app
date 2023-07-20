import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddChannel({ onAddChannel }) {
  const history = useHistory();
  const [nom, setNom] = useState('');
  const [frequence, setFrequence] = useState('');
  const [nbreUser, setNbreUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/channels', {
        Nom: nom,
        Frequence: frequence,
        Nbre_user: nbreUser
      });
      console.log(response.data);
      setNom('');
      setFrequence('');
      setNbreUser('');
      history.push('/list'); // Redirect to the channel list page
    } catch (error) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
          }
  };

  return (
    <div>
      <h1>Add Channel</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <br />
        <label>
          Fréquence:
          <input type="text" value={frequence} onChange={(e) => setFrequence(e.target.value)} />
        </label>
        <br />
        <label>
          Number of Users:
        <input type="text" value={nbreUser} onChange={(e) => setNbreUser(e.target.value)} />
        </label>

        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddChannel;
