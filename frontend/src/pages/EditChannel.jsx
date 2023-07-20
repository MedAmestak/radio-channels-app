import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditChannel() {
  const { id } = useParams();
  const history = useHistory();
  const [nom, setNom] = useState('');
  const [frequence, setFrequence] = useState('');
  const [nbreUser, setNbreUser] = useState('');

  useEffect(() => {
    fetchChannel();
  }, []);

  async function fetchChannel() {
    try {
      const response = await axios.get(`/api/channels/${id}`);
      const { Nom, Frequence, Nbre_user } = response.data;
      setNom(Nom);
      setFrequence(Frequence);
      setNbreUser(Nbre_user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/channels/${id}`, {
        Nom: nom,
        Frequence: frequence,
        Nbre_user: nbreUser
      });
      history.push('/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Channel</h1>
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
          Nombre d'utilisateurs:
          <input type="text" value={nbreUser} onChange={(e) => setNbreUser(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditChannel;
