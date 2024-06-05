import { useRef,useImperativeHandle, useState } from "react";
import { forwardRef } from "react";

const addPlace = forwardRef(function AddPlace({add},ref){

    const addPlace = useRef();

    useImperativeHandle(ref,()=>{
        return{
            open:()=>{
                addPlace.current.showModal();
            }
        }
    })

    const [place,setPlace] = useState("");
    const [file,setFile] = useState(null);
    const [id,setId] = useState("");
    const [lat,setLat] = useState();
    const [lon,setLon] = useState();


    function handleIdChange(event){
        setId(event.target.value);
    }

    function handlePlaceChange(event){
        setPlace(event.target.value);
    }

    function handleLatChange(event){
        setLat(event.target.value);
    }

    function handleLonChange(event){
        setLon(event.target.value);
    }

    function handleFileChange(event){
        setFile(event.target.files[0]);
    }

    function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData();

        const details = `id:${id},place:${place},lat:${lat},lon:${lon}`;

        formData.append('file', file);
        formData.append('data', details);

        fetch('http://localhost:8080/PlacePicker/addPlace',{
            method:"POST",
            body:formData
        })
        .then((Response)=>{
            if(Response.ok){
                return fetch('http://localhost:8080/PlacePicker/getAllPlaces')
            }
        })
        .then(Response =>Response.json())
        .then(result=>{
            add(result);
        })

        setId("")
        setFile(null)
        setLat()
        setLon()
        setPlace("")

        addPlace.current.close();

    }

    return(
        <dialog className="modal" ref={addPlace}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">Id : </label>
            <input  onChange={handleIdChange} type="text" name="id" id="id" value={id}></input>
            <br/>
            <label htmlFor="place">Place : </label>
            <input  onChange={handlePlaceChange} type="text" name="place" id="place" value={place}></input>
            <br/>
            <label htmlFor="lat">Latitude : </label>
            <input  onChange={handleLatChange} type="number" name="lat" id="lat" value={lat}></input>
            <br/>
            <label htmlFor="lat">Longitude : </label>
            <input  onChange={handleLonChange} type="number" name="lon" id="lon" value={lon}></input>
            <br/>
            <label htmlFor="image">choose Image : </label>
            <input onChange={handleFileChange} type="file" name="image" id="image" accept="images/*"></input>
            <br/>
            <button type="submit">Add</button>
        </form>
        </dialog>
    )
})

export default addPlace;