import { useState, useEffect } from 'react';
import './App.css';

// fnevarez@tango.io

function App() {

  const [pokemon, setPokemon] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage]= useState('')
  const [test, setTest]= useState(false)

  useEffect(()=>{
    if(pokemon.length ===6) setMessage('You reach the limit of Pokemons in a Party (6 pokemons)')
    else if(test) setMessage('You can not store a pokemon that is already stored in the party!')
    else setMessage('')
  })
 

  const fetchPokemon = (name)=>{
     fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res=> res.json()).then(data=> setPokemon([...pokemon, data]))
      .catch(err=> console.log(err))
  }  

  const handleChange =(event)=>{
    setName(event.target.value.trim())
  }

  const handleSearch =()=>{ 
    if(pokemon.length <= 5){
      if(!pokemon.some(poke=> poke.name.toLowerCase() === name.toLowerCase())){
        fetchPokemon(name)
        setTest(false)
        setName('') 
      }
      else(setTest(true))  
    }        
  }

  const deletePokemon = (id)=>{      
   const newPoke = pokemon.filter(item=> item.id !== id)
    setPokemon(newPoke)
  } 

  return (
    <div className="App">
    <div >
      <input type='text' value={name} onChange={handleChange} />
      <button className='button-search' type='submit' onClick={handleSearch}>Find Pokemon</button>
    </div>
    <p style={{color:'red'}}>{message}</p>

    <p className="title">Pokemons Party</p>
    <div className ='party'> 
      {pokemon?.map(poke=>(
        <div key={poke?.id} className='pokemon'>
          <div>{poke?.name}</div>
          <img src={poke?.sprites?.front_default}/>
          <button className='button-delete' onClick={()=>deletePokemon(poke.id)}>delete</button>
        </div>
      ))}
    </div>     
    </div>
  );
}

export default App;
