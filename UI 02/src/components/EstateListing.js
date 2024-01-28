import React, {useState} from 'react';
import {useDrag} from 'react-dnd';
import {IoMdAddCircle} from "react-icons/io";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FloorPlan from '../images/FloorPlan.jpg';
import {Carousel} from 'react-bootstrap';
import {IoClose} from "react-icons/io5";

const EstateItem = ({estateItem, addToFavoriteList, setPopupEstateItem}) => {
    const dragSpec = {
        type: 'estateItem',
        item: {id: estateItem.id},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addToFavoriteList(item.id);
            }
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    };

    const [{isDragging}, drag] = useDrag(dragSpec);

    const renderEstateDetails = () => (
        <section className="d-flex flex-column align-content-between">
            <h2 className="text-success pb-3 mx-3">{estateItem.type} in {estateItem.location}</h2>
            <span className="pb-2 mx-3"><b>Price: </b>${estateItem.price.toLocaleString()}</span>
            <span className="pb-2 mx-3"><b>Bedrooms: </b>{estateItem.bedrooms}</span>
            <span className="pb-2 mx-3"><b>Type: </b>{estateItem.type}</span>
            <span className="mx-3 bottom-100"><b>Added on: </b>{`${estateItem.added.month} ${estateItem.added.day}, ${estateItem.added.year}`}</span>
        </section>
    );

    return (
        <>
            <hr/>
            <article className="estateItem" ref={drag} onClick={() => setPopupEstateItem(estateItem)}>
                <div className="row g-3">
                    <div className="col-md-8">
                        {renderEstateDetails()}
                    </div>
                    <div className="col-md-4">
                        <figure className="estateImg">
                            <img src={require(`../${estateItem.picture}`)} alt="Estate" className="img-fluid"/>
                        </figure>
                    </div>
                    <div className="col-12">
                        <span
                            className="mx-3 bottom-100">{`${estateItem.added.month} ${estateItem.added.day}, ${estateItem.added.year}`}</span>
                        <IoMdAddCircle className="addToPreferred float-end" onClick={(event) => {
                            event.stopPropagation();
                            addToFavoriteList(estateItem.id);
                        }}/>
                    </div>
                </div>
            </article>
        </>
    );

};


const EstateListing = ({data, addToFavoriteList}) => {
    const [popupEstateItem, setPopupEstateItem] = useState(null);

    const handleEstateItemClick = (estateItem) => {
        estateItem.images = Array.from({length: 8}, (_, i) => estateItem[`img${i + 1}`]).filter(Boolean);
        setPopupEstateItem(estateItem);
    };

    return (
        <main className="estates container">
            {data.properties && data.properties.map(estateItem => (
                <EstateItem key={estateItem.id} estateItem={estateItem} addToFavoriteList={addToFavoriteList}
                            setPopupEstateItem={handleEstateItemClick}/>
            ))}
            {popupEstateItem && popupEstateItem.images && (
                <section className="popup-box container-fluid w-75">
                    <IoClose className="c-btn float-end" onClick={() => setPopupEstateItem(null)}/>
                    <Tabs>
                        <TabList className="nav nav-pills justify-content-center">
                            <Tab className="btn-warning active rounded p-2 m-2">Property Details</Tab>
                            <Tab className="btn-warning active rounded p-2 m-2">Location</Tab>
                            <Tab className="btn-warning active rounded p-2 m-2">Floor Plan</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="t-pane fade show active">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <h2 className="h3 text-center"
                                                style={{color: "#16754e"}}>{popupEstateItem.type} in {popupEstateItem.location}</h2>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-md-8 w-50">
                                            <div className="h-50 w-auto">
                                                <Carousel>
                                                    {popupEstateItem.images.map((image, index) => (
                                                        image && (
                                                            <Carousel.Item>
                                                                <img src={require(`../${image}`)} alt="Estate"
                                                                     className="img-fluid popup-img"/>
                                                            </Carousel.Item>
                                                        )
                                                    ))}
                                                </Carousel>
                                            </div>
                                        </div>
                                        <div className="col"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <p className="pt-2 text-center">{popupEstateItem.description}</p>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                    <div className="row pb-4">
                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col">
                                                    <div><b>Bedrooms:</b></div>
                                                    <div>{popupEstateItem.bedrooms}</div>
                                                </div>
                                                <div className="col">
                                                    <div><b>Price:</b></div>
                                                    <div>${popupEstateItem.price.toLocaleString()}</div>
                                                </div>
                                                <div className="col">
                                                    <div><b>Tenure:</b></div>
                                                    <div>{popupEstateItem.tenure}</div>
                                                </div>
                                                <div className="col">
                                                    <div><b>Location:</b></div>
                                                    <div>{popupEstateItem.location}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="row justify-content-center align-items-center h-100">
                                <div className="col-auto">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4948497.735844269!2d-7.607698366313402!3d52.72752473588747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d0a98a6c1ed5df%3A0xf4e19525332d8ea8!2sEngland%2C%20UK!5e0!3m2!1sen!2slk!4v1705002514587!5m2!1sen!2slk"
                                        width="600" height="450" allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="row justify-content-center align-items-center h-50">
                                <div className="col-auto">
                                    <img src={FloorPlan} alt="Floor Plan" className="img-fluid"/>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </section>
            )}
        </main>
    );

};

export default EstateListing;
