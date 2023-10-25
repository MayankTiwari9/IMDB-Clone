import React, { useState } from 'react'
import axios from "axios";
import "./Header.css";
import logo from "../../Images/imdblogo.svg.png"

const Header = () => {

  const [getTitle, setTitle] = useState('');
  const [getResult, setResult] = useState(null);


  const fetchData = async (e) => {
    e.preventDefault();
    if (!getTitle) {
      setResult(null);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/auto-complete',
      params: { q: `${getTitle}` },
      headers: {
        'X-RapidAPI-Key': '65f28a5fcfmsh4bd962448c364f5p183a1fjsn69fd2ae594e3',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.d);
      setResult(response.data.d);
    } catch (error) {
      console.error(error);
    }

    setTitle('');
  }


  return (
    <div>
      <div id='header-container'>
        <div id='logo-div'>
          <img src={logo} alt='logo' />
        </div>
        <div id='menu-div'>
          <h4>Menu</h4>
        </div>
        <form onSubmit={fetchData}>
          <div id='search-div'>
            <input 
            type='text' 
            name='search' 
            placeholder='Search IMDB' 
            value={getTitle} 
            onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
        </form>
        <div>IMDB Pro</div>
        <div>WAtchlist</div>
        <div>Sign In</div>
      </div>
      {getResult && (
        <div>
          {getResult.map((res, index) => (
            <div key={index} id='home-container'>
              <div>
                {res.i ? (
                  <img src={res.i.imageUrl} alt='poster' />
                ) : <div>Nill</div>}
              </div>
              <div>
                <h3>{res.l}</h3>
                <h3>{res.y}</h3>
                <h3>{res.s}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header;
