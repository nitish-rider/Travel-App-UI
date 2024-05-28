import React, {useEffect, useState} from 'react';
import "./Home.css"
import {getAllSuggestedPlacesService, getPlaceSuggestionService} from "../../Service/APIService";
import {Button, ButtonProps, CircularProgress, InputAdornment, styled, TextField} from "@mui/material";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FavoritePlacesCards from "../../Components/FavoritePlaceCard/FavoritePlacesCards";

interface PlacesToVisit{
  name: string;
  description: string;
}

interface Place {
  city: string;
  placesToVisit: PlacesToVisit[];
  _id: string;
  createdAt: string;
  __v: number;
  createdBy: string;
}

const HomePage = () => {
  const [token, setToken] = React.useState<string|null>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [newPlace, setNewPlace] = useState<string>('');
  const[isLoading, setIsLoading] = useState<boolean>(false);



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if(places.some(place => place.city.toLowerCase() === newPlace.toLowerCase())){
        alert("Place already exists")
        return;
    }
    const body = {
      "city" : newPlace
    }
    const allSuggestedPlacesResp = await getPlaceSuggestionService(body)
    if (allSuggestedPlacesResp.status === 201) {
      setPlaces([...places, allSuggestedPlacesResp.data])
      setIsLoading(false)
    }
  };

  const getAllSuggestedPlaces = async () => {
    const allSuggestedPlacesResp = await getAllSuggestedPlacesService();
    if (allSuggestedPlacesResp.status === 200) {
      setPlaces([...allSuggestedPlacesResp.data])

    }

  }

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#FFF",
    backgroundColor: "black",
    '&:hover': {
      backgroundColor: "black",
    },
  }));


  useEffect( () => {
    if (sessionStorage.getItem("isLogin") === "true") {
      setToken(sessionStorage.getItem("token"));
      getAllSuggestedPlaces()
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className={"home-container"}>
      <div style={{display: "flex", justifyContent: "center", width: "100vw"}}>
        <div className={"search-container"}>
          <TextField className={"place-inp"} id="place-inp" label="Enter Place" variant="outlined"
                     InputProps={{
                       startAdornment: <InputAdornment position="start"><ImageSearchIcon/></InputAdornment>,
                     }}
                     value={newPlace} onChange={e => setNewPlace(e.target.value)}
          />
          <ColorButton className={"place-search-btn"} variant="contained" type="submit" onClick={handleSubmit}>Search {isLoading &&  <CircularProgress
              size={20} style={{padding:"3px"}}
          ></CircularProgress> }</ColorButton>
        </div>
      </div>
      <div className={"cards-container"}>
        {places.map((place) => (
            <FavoritePlacesCards key={place._id} city={place.city} __v={place.__v}
                                 _id={place._id} placesToVisit={place.placesToVisit} createdAt={place.createdAt}
                                 createdBy={place.createdBy}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;