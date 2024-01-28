import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RiDeleteBin6Fill } from "react-icons/ri";

const FavoriteItem = ({ property, removeFromFavourites }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'property',
        item: { id: property.id },
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                removeFromFavourites(item.id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} key={property.id} className="favoriteItem " style={{ width: "18rem", margin: "10px" }}>
            <img src={require(`../${property.picture}`)} alt="Property" className="card-img-top" />
            <div>
                <h5 className="card-title">{property.type} in {property.location}</h5>
                <p className="card-text">Price: ${property.price.toLocaleString()}</p>
                <p className="card-text">Location: {property.location}</p>
                <div className="btn-outline-danger rounded" onClick={() => removeFromFavourites(property.id)}>
                    Delete <RiDeleteBin6Fill />
                </div>
            </div>
        </div>
    );
};

const FavoriteList = ({ favourites, removeFromFavourites }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'property',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                removeFromFavourites(item.id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });


    return (
        <div ref={drop} className={`favoriteList ${canDrop ? 'over' : ''}`}>
            <h2>Favourites</h2>
            <div className="d-flex flex-row flex-wrap">
                {favourites.map(property => (
                    <FavoriteItem property={property} removeFromFavourites={removeFromFavourites} />
                ))}
            </div>
        </div>
    );
};

export default FavoriteList;
