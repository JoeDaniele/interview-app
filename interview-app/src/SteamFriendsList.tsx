import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Friend {
  steamid: string;
  relationship: string;
  friend_since: number;
}

const SteamFriendsList = () => {
  const [steamKey, setSteamKey] = useState('');
  const [steamId, setSteamId] = useState('');
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const getFriendsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5019/api/SteamFriendsApi/GetFriendsList?steamKey=${steamKey}&steamId=${steamId}`
      );
      setFriendsList(response.data.friendslist.friends);
    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };

  useEffect(() => {
    if (steamKey && steamId) {
      getFriendsList();
    }
  }, [steamKey, steamId]);

  return (
    <div>
      <h1>Steam Friends List</h1>
      <div>
        <label>Steam Key:</label>
        <input
          type="text"
          value={steamKey}
          onChange={(e) => setSteamKey(e.target.value)}
        />
      </div>
      <div>
        <label>Steam ID:</label>
        <input
          type="text"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        />
      </div>
      <button onClick={getFriendsList}>Get Friends List</button>

      {friendsList.length > 0 ? (
        <ul>
          {friendsList.map((friend) => (
            <li key={friend.steamid}>
              <p>Steam ID: {friend.steamid}</p>
              <p>Relationship: {friend.relationship}</p>
              <p>
                Friend Since:{' '}
                {new Date(friend.friend_since * 1000).toLocaleString()}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends to display</p>
      )}
    </div>
  );
};

export default SteamFriendsList;
