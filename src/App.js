import './App.css';
import imgFond from'./fond.jpg';

/*chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security*/

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA5YThjNWEzLWY2NTctNDljNy05N2EwLWUyNDYyNDdlZjAwOSIsImlhdCI6MTY4MDM1NzA4MCwic3ViIjoiZGV2ZWxvcGVyL2RiOGM1MTY5LTdiMDgtMjFmMC1iMDI0LTA2ODczYWNhY2RjZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMDkuMjIyLjExMS41NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.EMucvA3JkvN4hNzb0TiWwuIeB07Kpdj6XYAb5ODusFwV7mJntALKPSVVmCgfFtnV7gWv3t7t0QhkTmyItr4uwQ'


function App() {
  const [playerId, setPlayerId] = useState('');
  const [clanId, setClanId] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [clanData, setClanData] = useState(null);
  const [playerTrophies, setPlayerTrophies] = useState(0);
  const [players, setPlayers] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);


  const handleIdChange = (event) => {
    setPlayerId(event.target.value);
  };

  const fetchData = async () => {
    const response = await fetch(`https://api.clashroyale.com/v1/players/%23${playerId}`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setPlayerData(data);
    setPlayerDeck(data.currentDeck);
    setClanId(data.clan.tag);
    console.log(data.clan.tag)
  
    const response2 = await fetch(`https://api.clashroyale.com/v1/clans/%${clanId}`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });
    const data2 = await response2.json();
    setClanData(data2.menberList);
    console.log(clanData);
    };

  const handleSaveData = async () => {
    const response = await fetch('https://cr.mocklab.io/trophees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playerData.name,
        trophies: playerTrophies
      })
    });
    if (response.ok) {
      alert('Player data saved successfully!');
    } else {
      alert('Failed to save player data.');
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('https://cr.mocklab.io/trophees');
      const data = await response.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  return (
    <Box sx={{
      backgroundImage: `url(${imgFond})`, 
      backgroundSize: 'cover',
      height: '100vh',
      width: '100%',
      textAlign:'center',
      pt:'50px',
    }}>
        <label>
          <TextField id="standard-basic" label="Player ID" variant="standard" onChange={handleIdChange}/>
        </label>
        <Button variant="contained" onClick={fetchData} sx={{mt:'15px', ml:'15px'}}>Obtenir mes infos</Button>
      {playerData ? (
        <div>
          {console.log(playerData)}
          <h1>{playerData.name}</h1>
          <p>{playerData.trophies} Trophies</p>
          <p>Deck actuel</p>
          
          <Box>
            <ImageList sx={{ width: 600, height: 450 }} cols={4} rowHeight={150}>
              {playerDeck.map((card, index) => (
                <ImageListItem key={index}>
                  <img src={card.iconUrls.medium} key={index} alt={card.name} className={playerDeck.includes(card.idName) ? '' : 'grayed-out'} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>

          <p>
            <label>
              Trophies:
              <input type="number" value={playerTrophies} onChange={(e) => setPlayerTrophies(parseInt(e.target.value))} />
            </label>
            <button onClick={handleSaveData}>Save Player Data</button>
          </p>
        </div>
      ) : (
        <p>Enter a player ID to get started.</p>
      )}
      <h2>Classement actuel</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.trophies} Trophies
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default App;

// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';


// function App() {
//   const [playerId, setPlayerId] = useState('');
//   const [playerData, setPlayerData] = useState(null);

//   const handleIdChange = (event) => {
//     setPlayerId(event.target.value);
//   };

//   const fetchData = async () => {
//     const response = await fetch(`https://api.clashroyale.com/v1/players/%${playerId}`, {
//       headers: {
//         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdlNDhhODAyLWRkNmUtNGE4MS1hZDczLWMxOGYwZDgzYzgzOCIsImlhdCI6MTY4MDU5MjI2OSwic3ViIjoiZGV2ZWxvcGVyL2RiOGM1MTY5LTdiMDgtMjFmMC1iMDI0LTA2ODczYWNhY2RjZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzguMjA4LjE5LjQwIl0sInR5cGUiOiJjbGllbnQifV19.wHJzvkJKPawBxhuPbQUfFvPGiGVNYV1h3Dchv9BzLy8yCDRgYPQHW_7VopFHFpbR2e2syvnycQYtuJ4FSaJTiw',
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await response.json();
//     setPlayerData(data);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetchData();
//   };

//   return (
//     <div>
//       <Stack spacing={2} direction="row" sx={{p:'10px'}}>
//         <form onSubmit={handleSubmit}>
//           <label>
//             <TextField id="standard-basic" label="Player ID" variant="standard" onChange={handleIdChange}/>
//           </label>
//           <Button variant="outlined" type="submit" sx={{mt:'15px', ml:'15px'}}>Obtenir mes infos</Button>
//         </form>
//       </Stack>

//       {playerData ? (
//         <div>
//           {console.log(playerData)}
//           <h1>{playerData.name}</h1>
//           <p>Trophées : {playerData.trophies}</p>
//           <p>Vistoires : {playerData.wins}</p>
//           <p>Vistoires à 3 couronnes : {playerData.threeCrownWins}</p>
//           <p>Matchs perdu : {playerData.losses}</p>
//           <p>Clan : {playerData.clan.name} ({playerData.clan.tag})</p>
//         </div>
//       ) : (
//         <p>Entrer un ID pour commencer !</p>
//       )}
//     </div>
//   );
// }

// export default App;
