import React, { useState, useEffect } from 'react';
import {Button, ButtonProps, Card, CardContent, styled} from "@mui/material";
import "./FavoritePlacesCards.css"
import ShowPlacesToVisitModal from "../ShowPlacesToVisitModal/ShowPlacesToVisitModal";

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

const FavoritePlacesCards: React.FC<Place>= ({city,placesToVisit,_id,createdBy,createdAt,__v}) => {

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


    return (
        <>
            <Card style={{


            }} className="fav-place-cards-com">
                <CardContent >
                    <div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <h3>{city}</h3>
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