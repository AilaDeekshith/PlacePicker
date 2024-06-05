import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';
import AddPlace from './components/AddPlace.jsx';


// const storedIds = JSON.parse(localStorage.getItem('selected_Places'))||[];
// const storedPlaces = storedIds.map((id)=>AVAILABLE_PLACES.find((place)=>place.id === id));


function App() {
  
  const selectedPlace = useRef();
  const addPlace = useRef();
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [availablePlaces,setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     const sortedPlaces = sortPlacesByDistance(
  //       AVAILABLE_PLACES,
  //       position.coords.latitude,
  //       position.coords.longitude);
  
  //     setAvailablePlaces(sortedPlaces);
  //   })
  // },[])

  useEffect(()=>{

    async function fetchPlaces(){
      const response = await fetch('http://localhost:8080/PlacePicker/getAllPlaces');
      const data = await response.json();
      setAvailablePlaces(data);
    }

    fetchPlaces();
    
  },[])

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = availablePlaces.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selected_Places'))||[];
    if(storedIds.indexOf(id) === -1){
      localStorage.setItem('selected_Places',JSON.stringify([id,...storedIds]));
    }

  }

  function handleAvailablePlaces(places){
    setAvailablePlaces(places);
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selected_Places'))||[];
    localStorage.setItem('selected_Places',JSON.stringify(storedIds.filter((id)=>id !== selectedPlace.current)))
  }

  function handleAddPlace(){
    addPlace.current.open();
  }

  return (
    <>
      <Modal  open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
      <div className='btn'>
        <AddPlace ref={addPlace} add={handleAvailablePlaces}/>
        <button onClick={handleAddPlace} >Add Place</button>
      </div>

    </>
  );
}

export default App;