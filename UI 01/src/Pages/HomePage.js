import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TopBar from '../Components/NavBar';
import { SearchForm } from "../Components/SearchForm";
import FavoriteList from "../Components/FavoriteList";
import BottomBar from "../Components/Footer";
import PropertyList from "../Components/PropertyList";
import PropertyData from "../propertyData.json";

export const HomePage = () => {
    const [filteredProperties, setFilteredProperties] = useState(PropertyData.properties);
    const [favourites, setFavourites] = useState([]);

    const addToFavourites = (id) => {
        const property = filteredProperties.find(property => property.id === id);
        if (property && !favourites.includes(property)) {
            setFavourites([...favourites, property]);
        }
    };

    const removeFromFavourites = (id) => {
        setFavourites(favourites.filter(property => property.id !== id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="d-flex flex-column vh-100">
                <TopBar/>
                <div className="container-fluid mt-3 pt-5 pb-5 flex-fill">
                    <div className="row pt-2 h-100">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md">
                                    <SearchForm setFilteredProperties={setFilteredProperties}/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md">
                                    <PropertyList data={{ properties: filteredProperties }} addToFavourites={addToFavourites}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md fv-container d-flex flex-column">
                            <div className="favouriteListBox flex-fill">
                                <div className="favouriteList h-100">
                                    <FavoriteList favourites={favourites} removeFromFavourites={removeFromFavourites}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomBar/>
            </div>
        </DndProvider>
    );
};