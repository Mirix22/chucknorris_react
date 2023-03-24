import { useState } from 'react'
import './App.css'
import chuck from './assets/img.svg'
import DropDown from './components/DropDown'
import Buttons from './components/Buttons'
import Joke from './components/Joke'



function App() {
  const [categories, setCategories] = useState([])
  const [joke, setJoke] = useState("")
  const [seleziones, setseleziones] = useState("")

  function CaricaIlJoke(){
      let url = 'https://api.chucknorris.io/jokes/categories'

    let promise = fetch(url)

    promise.then(
        response => response.json()
    ).then(
        data => {
          data.forEach(element => {
            let obj = data.map(function(item, index){
              return {
                id: index,
                value: item
              }
            })
            setCategories(obj)
          });
        }
    )
  }

  function mostraJoke(){
    if(seleziones != ""){
      let url = `https://api.chucknorris.io/jokes/random?category=${seleziones}`
      let promise = fetch(url)
      
      promise.then(
        response => response.json()
      ).then(
        data => setJoke(data.value)
      ) 
    }else{
      let url = `https://api.chucknorris.io/jokes/random`
      let promise = fetch(url)
      
      promise.then(
        response => response.json()
      ).then(
        data => setJoke(data.value)
      ) 
      
    }
  }

  function selezioneUtente(e){
    setseleziones(e)
  }

  

  function copia(){
    if(joke != ""){
      navigator.clipboard.writeText(joke)
      alert("Il testo è stato copiato")
    }
  }

  return (
    <div className="App">
      <div id='container'>
      <h1>Webapp API Chuck Norris</h1>
      <p>Design di una pagina che utilizza la API di chucknorris.io per generare alla pressione di un pulsante una battuta del tipo che selezioni nel menu a tendina qui sotto.</p>
      <img src={chuck}/>
      <DropDown categories={categories} action={CaricaIlJoke} evento={selezioneUtente} />
      
      {joke != "" &&
        <Joke joke={joke}/>
      } 
      
      <Buttons text="carica joke" variant={"active"}  styles={"margin-top-75"} action={() => mostraJoke()}/>
      <Buttons text="copia testo" variant={joke === "" ? "disabled" : "active"} styles={"margin-top-20"} action={copia}/>
      </div>
    </div>
  )
}

export default App
