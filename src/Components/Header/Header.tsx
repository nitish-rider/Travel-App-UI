import React from 'react';
import "./Header.css"
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className={"container"}>
                <TravelExploreIcon style={{fontSize: "28px"}}/>
                <h1>Travel Planner App</h1>
            </div>
        </header>
);
};

export default Header;