import { useEffect, useState } from 'react';
import instance from '../utils/axios.js'

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await instance.get('/playlist');
        setPlaylists(res.data);
        console.log('Playlists:', res.data);
      } catch (err) {
        console.error('Error fetching playlists:', err);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Playlists</h2>
      {playlists.map((pl, i) => (
        <div key={i} className="p-4 bg-gray-800 text-white rounded mb-2">
          <h3 className="text-lg font-semibold">{pl.title}</h3>
          <p>Mood: {pl.mood}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistPage;
