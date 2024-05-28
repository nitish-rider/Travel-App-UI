import React, { useState, useEffect } from 'react';
import {Button, ButtonProps, Card, CardContent, styled} from "@mui/material";
import "./FavoritePlacesCards.css"
import ShowPlacesToVisitModal from "../ShowPlacesToVisitModal/ShowPlacesToVisitModal";
import DeleteIcon from '@mui/icons-material/Delete';
import {deletePlaceService} from "../../Service/APIService";

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
    refreshData: () => void;
}

const FavoritePlacesCards: React.FC<Place>= ({city,placesToVisit,_id,createdBy,createdAt,__v, refreshData}) => {

    const[detailsVisiblity, setDetailsVisiblity] = useState<boolean>(false);

    const handleClose = () => {
        setDetailsVisiblity(!detailsVisiblity);
    }

    const showDetails = () => {
        setDetailsVisiblity(!detailsVisiblity);
        console.log("Details", placesToVisit)
    }

    useEffect(() => {
        console.log("FavoritePlaces", city)
    }, []);

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: "#FFF",
        backgroundColor: "black",
        '&:hover': {
            backgroundColor: "black",
        },
    }));

    const handleDelete = async () => {
        const DeleteResp = await deletePlaceService(_id);
        if(DeleteResp.status === 204){
            refreshData();
        }
    }


    return (
        <>
            <Card style={{


            }} className="fav-place-cards-com">
                <CardContent >
                    <div>
                        <div style={{display:"flex" ,alignItems:"center"}}>
                            <div style={{display: "flex", justifyContent: "center" , flex:"1 0 90%"}}>
                                <h3>{city}</h3>
                            </div>
                            <DeleteIcon onClick={handleDelete} style={{cursor:"pointer"}}/>
                        </div>

                        <div style={{display: "flex", justifyContent: "center"}}>
                        <p>Added at - {createdAt}</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <ColorButton variant="contained" type={"button"} onClick={showDetails}>
                                View Places to visit
                            </ColorButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {
                detailsVisiblity &&
                <ShowPlacesToVisitModal open={detailsVisiblity} handleClose={handleClose} array={placesToVisit} city={city}/>
            }
        </>
    );
};

export default FavoritePlacesCards;