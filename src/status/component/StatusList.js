import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import StatusItem from "./StatusItem";
import './StatusList.css';

const StatusList = props => {
    if (props.items.length === 0){
        return (
        <div className="status-list center">
            <Card>
                <h2>Info tanaman tidak ditemukan</h2>
                <Button>Tambahkan informasi</Button>
            </Card>
        </div>
        ); 
    }
    try{
        return (
        <ul className="status-list">
            {props.items.map(status=> (
                <StatusItem 
                key={status.id} 
                id={status.id} 
                image={status.image} 
                title={status.title} 
                description={status.description}
                ph={status.ph}
                nitrogen={status.nitrogen}
                phospor={status.phospor}
                kalium={status.kalium}
                temperature={status.temperature}
                humidity={status.humidity}
                prediction={status.prediction}
                accuracy={status.accuracy}
                creator={status.creator}
                onDelete={props.onDeletePlant}
                />
            ))}
        </ul>
        )
    } catch (err){
        console.log(err);
    }
};

export default StatusList;