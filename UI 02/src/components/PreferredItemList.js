import React from 'react';
import {useDrag, useDrop} from 'react-dnd';

const PreferredItem = ({estateItem, removeFromFavoriteList}) => {
    const [{isDragging}, drag] = useDrag({
        type: 'estateItem',
        item: {id: estateItem.id},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (!monitor.didDrop()) {
                removeFromFavoriteList(item.id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} key={estateItem.id} className="preferredItem">
            <img src={require(`../${estateItem.picture}`)} alt="Estate" className="card-img-top"/>
            <div className="col">
                <h4 className="card-title">{`${estateItem.type} in ${estateItem.location}`}</h4>
                <h2 className="card-text">{`Price: $${estateItem.price.toLocaleString()}`}</h2>
                <p className="card-text">{`Location: ${estateItem.location}`}</p>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <div className="btn-outline-warning rounded"
                             onClick={() => removeFromFavoriteList(estateItem.id)}>
                            Remove
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
};

const PreferredItemList = ({preferredEstates, removeFromFavoriteList}) => {
    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'estateItem',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                removeFromFavoriteList(item.id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} className={`preferredList ${canDrop ? 'over' : ''}`}>
            <h2>{'Preferred'}</h2>
            <div className="d-flex flex-row flex-wrap">
                {preferredEstates && preferredEstates.map((estateItem, index) => {
                    return <PreferredItem key={index} estateItem={estateItem} removeFromFavoriteList={removeFromFavoriteList}/>
                })}
            </div>
        </div>
    );
};

export default PreferredItemList;
