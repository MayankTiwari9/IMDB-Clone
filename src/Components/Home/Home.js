import React, { useState } from 'react'
import axios from "axios";

const Home = () => {

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
      url: `https://imdb-search2.p.rapidapi.com/${getTitle}`,
      headers: {
        'X-RapidAPI-Key': '65f28a5fcfmsh4bd962448c364f5p183a1fjsn69fd2ae594e3',
        'X-RapidAPI-Host': 'imdb-search2.p.rapidapi.com',
      },
    };

    try{
      const response = await axios.request(options);

      const updatedData = response.data.description.map((res) => {
        const updatedRes = {};
        Object.keys(res).forEach((key) => {
          updatedRes[key.replace(/#/g, '')] = res[key];
        });
        return updatedRes;
      });

      setResult(updatedData);

    }
    
    catch (error) {
      console.error(error);
      setResult(null);
    }
  };



  return (
    <div>
      <nav>
        <form onSubmit={fetchData}>
        <div>
            <input type='text' name='search' placeholder='Search IMDB' value={getTitle} onChange={(e) => setTitle(e.target.value)} />
            {getResult && (
              <div>
                {getResult.map((res, index) => (
                  <div key={index} id='home-container'>
                    <div>
                      <img src={res.IMG_POSTER} alt='poster'/>
                    </div>
                    <div>
                      <h3>{res.TITLE}</h3>
                      <h3>{res.YEAR}</h3>
                      <h3>{res.ACTORS}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </form>
      </nav>
    </div>
  )
}

export default Home;
