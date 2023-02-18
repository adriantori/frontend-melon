import React from 'react';

import PlantItem from './PlantItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlantList.css';

const PlantList = props => {
    if (props.items.length === 0){
        return (
            <div className = "center">
                <Card>
                <h2>Tanaman tidak ditemukan</h2>
                <Button to="/addPlant">Tambahkan tanaman baru</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className='plants-list'>
            {props.items.map(plant => (
                <PlantItem 
                key={plant.id} 
                id={plant.id} 
                image={plant.image} 
                title={plant.title} 
                description={plant.description}
                />
            ))}
        </ul>
    );
};

export default PlantList;