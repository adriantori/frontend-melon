import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './PlantItem.css';

const StatusItem = props => {
    return (
        <li className="plant-item">
            <Card className='plant-item__content'>
                <Link to={`/${props.id}/status`}> 
                    <div className='plant-item__image'>
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
                    </div>
                    <div className="plant-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.description}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default StatusItem;