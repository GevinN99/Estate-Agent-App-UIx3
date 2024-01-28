import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HeaderBar from '../components/HeaderBar';
import {PropertySearchForm} from "../components/PropertyFilterForm";
import PreferredItemList from "../components/PreferredItemList";
import Footer from "../components/footer";
import EstateListing from "../components/EstateListing";
import EstateData from "../Data.json";

export const MainPage = () => {
    const [filteredEstates, setFilteredEstates] = useState(EstateData.properties);
    const [preferredEstates, setPreferredEstates] = useState([]);

    const addToFavoriteList = (id) => {
        const estate = filteredEstates.find(estate => estate.id === id);
        if (estate && !preferredEstates.includes(estate)) {
            setPreferredEstates([...preferredEstates, estate]);
        }
    };

    const removeFromFavoriteList = (id) => {
        setPreferredEstates(preferredEstates.filter(estate => estate.id !== id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="d-flex flex-column vh-100">
                <HeaderBar/>
                <div className="container-fluid mt-3 pt-5 pb-5 flex-fill">
                    <div className="row pt-2 h-100">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md">
                                    <PropertySearchForm setFilteredEstates={setFilteredEstates}/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md">
                                    <EstateListing data={{ properties: filteredEstates }} addToFavoriteList={addToFavoriteList}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md fv-container d-flex flex-column">
                            <div className="preferredBox flex-fill">
                                <div className="h-100">
                                    <PreferredItemList preferredEstates={preferredEstates} removeFromFavoriteList={removeFromFavoriteList}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </DndProvider>
    );
};
