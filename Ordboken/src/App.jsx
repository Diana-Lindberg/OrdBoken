import './App.css'
import { useState } from 'react';


function App({data}) {
  const [word, setWord] = useState ('') //Sköter skrivet ord
  const [searchedWord, setSearchedWord] = useState(''); //Sköter sökt ord
  const [definition, setDefinition] = useState ('') //Sköter ordets betydelse
  const [audio, setAudio] = useState ('') //Sköter ljudfil
  const [error, setError] = useState ('') //Sköter felmeddelande
  
 
  //Visa felmeddelande vid tomt fält
  async function search() {
    if(word.length === 0){
      setError('Fyll i sökfält')
      return;
    } else{
      setError('')
      setSearchedWord(word);
    }

    //api anrop
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
  
      //Om sökt ord inte finns visa felmeddelande
      if (!response.ok) {
        setAudio('');
        setError('Ordet hittades inte');
        setDefinition('');
        return;
      }
  
      const data = await response.json();

      //Konterollera om förklaring finns
      if (data.length > 0 && data[0].meanings.length > 0 && data[0].meanings[0].definitions.length > 0) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
  
        // Kontrollera om ljudfil finns
        if (data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
          setAudio(data[0].phonetics[0].audio);
        } else {
          setAudio('');
        }
      } else {
        //Om förklaring inte finns visa felmeddelnade
        setDefinition('');
        setAudio('');
        setError('Ingen definition för detta ord');
      }
    } catch (error) {
      // Visa felmeddelandet vid problem med api-anrop
      setError('Ett problem uppstod vid hämtningen av data');
      setDefinition('');
      setAudio('');
    }
  }

  return (
   <div className='container'>
    <h1>ORDBOK</h1>
    {/* fält för att söka ord */}
    <input placeholder='Skriv in ett ord' onChange={(e)=>setWord(e.target.value)} type="text" />

    {/* Sökknapp */}
    <button onClick={search}>Sök</button>

    <div className='result__container'>
    {/* Visar ordet man sökt på */}
    <p>{searchedWord}</p>

    {/* Visar ordets betydelse */}
    <p>{definition}</p>
    </div>

    {/* Om ljudfil finns för sökt ord så visas en knapp som spelar upp ljudfilen*/}
    {audio && (
    <button onClick={()=>{const audioPlayer = new Audio(audio);audioPlayer.play()}}>Lyssna</button>
    )}

    {/*Här visas felmeddelanden*/}
    <p className='error'>{error}</p>

   </div>
  )
}

export default App;
