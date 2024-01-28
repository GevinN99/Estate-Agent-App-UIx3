import { FaHeart } from "react-icons/fa";
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { IoMdCloseCircle } from "react-icons/io";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FoorPlan from '../images/FloorPlan.jpg';

const Property = ({ property, addToFavourites, setPopupProperty }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'property',
        item: { id: property.id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addToFavourites(item.id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className="propertyItem" ref={drag} onClick={() => setPopupProperty(property)}>
            <div className="row g-3">
                <div className="col-md-8">
                    <div className="d-flex">
                        <div>
                            <h6 className="h5" style={{color: "#16754e"}}>{property.type} in {property.location}</h6>
                            <p><b>Price: </b>${property.price.toLocaleString()}</p>
                            <p><b>Location: </b>{property.location}</p>
                            <p><b>Bedrooms: </b>{property.bedrooms}</p>
                            <p><b>Type: </b>{property.type}</p>
                            <p className="w-75 text-justify"><b>Description: </b>{property.description}</p>
                            <span>Added on: {`${property.added.month} ${property.added.day}, ${property.added.year}`}</span>
                        </div>

                        <div onClick={(event) => event.stopPropagation()}>
                            <FaHeart className="addToFavourite" onClick={() => addToFavourites(property.id)}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="propertyImg">
                        <img src={require(`../${property.picture}`)} alt="Property" className="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Properties = ({data, addToFavourites}) => {
    const [popupProperty, setPopupProperty] = useState(null);

    const handlePropertyClick = (property) => {
        const images = [];
        for (let i = 1; i <= 8; i++) {
            if (property[`picture${i}`]) {
                images.push(property[`picture${i}`]);
            }
        }
        property.images = images;
        setPopupProperty(property);
    };

    return (
        <div className="properties container">
            {data.properties && data.properties.map(property => (
                <Property key={property.id} property={property} addToFavourites={addToFavourites}
                          setPopupProperty={handlePropertyClick}/>
            ))}
            {popupProperty && popupProperty.images && (
                <div className="popup container-fluid">
                    <IoMdCloseCircle className="exit-btn float-end" onClick={() => setPopupProperty(null)}/>
                    <Tabs>
                        <TabList className="nav nav-pills justify-content-center" role="tablist">
                            <Tab className="nav-link active m-2">Description</Tab>
                            <Tab className="nav-link active m-2">Location</Tab>
                            <Tab className="nav-link active m-2">Floor Map</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="tab-pane fade show active">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <h2 className="h3 text-center"
                                                style={{color: "#16754e"}}>{popupProperty.type} in {popupProperty.location}</h2>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>

                                    {/**/}
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-md-8 w-50">
                                            <div className="h-50 w-auto">
                                                <div id="custCarousel" className="carousel slide" data-ride="carousel">
                                                    <div className="carousel-inner">
                                                        {popupProperty.images.map((image, index) => (
                                                            image && (
                                                                <div
                                                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                                    <img src={require(`../${image}`)} alt="Property"
                                                                         className="img-fluid"/>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <a className="carousel-control-prev" href="#custCarousel"
                                                       data-slide="prev">
                                                        <span className="carousel-control-prev-icon"></span>
                                                    </a>
                                                    <a className="carousel-control-next" href="#custCarousel"
                                                       data-slide="next">
                                                        <span className="carousel-control-next-icon"></span>
                                                    </a>
                                                    <ol className="carousel-indicators list-inline">
                                                        {popupProperty.images.map((image, index) => (
                                                            image && (
                                                                <li className={`list-inline-item ${index === 0 ? 'active' : ''}`}>
                                                                    <a id={`carousel-selector-${index}`}
                                                                       data-slide-to={index}
                                                                       data-target="#custCarousel">
                                                                        <img src={require(`../${image}`)}
                                                                             alt={`Property ${index + 1}`}/>
                                                                    </a>
                                                                </li>
                                                            )
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col"></div>
                                    </div>
                                    {/**/}

                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <p className="text-center">{popupProperty.description}</p>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                    <div className="row pb-4">
                                        <div className=" text-center">
                                            <div>
                                                <span>Bedrooms: </span>&nbsp;&nbsp;
                                                <span>{popupProperty.bedrooms}</span>
                                            </div>
                                            <div>
                                                <span>Price: </span>&nbsp;&nbsp;
                                                <span>${popupProperty.price.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span>Tenure: </span>&nbsp;&nbsp;
                                                <span>{popupProperty.tenure}</span>
                                            </div>
                                            <div>
                                                <span>Location: </span>&nbsp;&nbsp;
                                                <span>{popupProperty.location}</span>
                                            </div>
                                            <div>
                                                <span>Added on: </span>&nbsp;&nbsp;
                                                <span>{`${popupProperty.added.month} ${popupProperty.added.day}, ${popupProperty.added.year}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="row justify-content-center align-items-center h-100">
                                <div className="col-auto">
                                    {/* Google Map iframe */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.182370726!2d-0.10159865000000001!3d51.52864165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2slk!4v1704863072132!5m2!1sen!2slk"
                                        width="100%" height="400px" style={{border: 1}} allowFullScreen=""
                                        loading="lazy" title="Google Map"/>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="row justify-content-center align-items-center h-100">
                                <div className="col-auto">
                                    <img src={FoorPlan} alt="Floor Plan" className="img-fluid"/>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default Properties;