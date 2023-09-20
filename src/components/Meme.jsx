import '../index.css'
import { useState, useEffect } from 'react'

function Meme() {

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMeme, setAllMeme] = useState([])

  const fetchMemeApi = async () => {
    try {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setAllMeme(data.data.memes)
    } catch (err) {
        console.error("Error fetching memes:", err)
    }
  }
  useEffect(() => {
    fetchMemeApi()
  }, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMeme.length)
    const url = allMeme[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme, randomImage: url
    }))

    setMeme(prevMeme => ({
      ...prevMeme, randomImage: url
    }))
  }
  function handleChange(event){
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name] : value
    }))   

  }
  return (
    <main>
      <div className="form">
        <input 
          type="text" 
          className="form--input"
          placeholder="top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange} 
        />
        <input 
          type="text" 
          className="form--input"
          placeholder="bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}  
        />
        <button 
          className="form--button"
          onClick={getMemeImage}
        >
          Get a new meme image   🖼
        </button>
      </div>
        <div className="meme">
          <img
            src={meme.randomImage}
            alt="Random Meme"
            className="meme--image"
          />
          <h2 className='meme--text top'>{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
          
        </div>
      
    </main>
  )
}

export default Meme