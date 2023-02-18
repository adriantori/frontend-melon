import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StatusItem.css"

const StatusItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const[showStatus, setShowStatus] = useState(false);
    const[showConfirmModal, setShowConfirmModal] = useState(false);

    const openStatusHandler = () => setShowStatus(true);
    const closeStatusHandler = () => setShowStatus(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        //delete item
        try{ 
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/plants/${props.id}`, 
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }    
            );
            props.onDelete(props.id);
        }catch(err){}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal 
            show={showStatus}
            onCancel={closeStatusHandler}
            header="Histori Tanaman"
            contentClass="status-item__modal-content"
            footerClass="status-item__modal-actions"
            footer={<Button onClick={closeStatusHandler}>Tutup</Button>}>
                <div className="status-container">
                    <div className="status-item__info">
                    <h2>Informasi Tanaman Terakhir</h2>
                    <h4>Nama Tanaman : {props.title}</h4>
                    <h4>Deskripsi Tanaman : {props.description}</h4>
                    <h4>pH : {props.ph}</h4>
                    <h4>Nitrogen : {props.nitrogen}</h4>
                    <h4>Fosfor : {props.phospor}</h4>
                    <h4>Kalium : {props.kalium}</h4>
                    <h4>Temperatur : {props.temperature}º Celcius</h4>
                    <h4>Kelembapan : {props.humidity}%</h4>
                    <h4>Prediksi : {props.prediction}</h4>
                    <h4>Akurasi : {props.accuracy}</h4>
                    </div>
                </div>
            </Modal>
            
            <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Apakah anda yakin?" 
            footerClass="plant-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Batal</Button>
                    <Button danger onClick={confirmDeleteHandler}>Hapus</Button>
                </React.Fragment>
            }>
                <p>Penghapusan bersifat permanen, apakah anda yakin?</p>
            </Modal>

        <li className="status-item">
            <Card className="status-item__content">
                {isLoading && <LoadingSpinner asOverlay/>}
            <div className="status-item__image">
                <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title}/>
            </div>
            <div className="status-item__info">
                <h2>Informasi Tanaman Terakhir</h2>
                <h4>Nama Tanaman : {props.title}</h4>
                <h4>Deskripsi Tanaman : {props.description}</h4>
                <h4>pH : {props.ph}</h4>
                <h4>Nitrogen : {props.nitrogen}</h4>
                <h4>Fosfor : {props.phospor}</h4>
                <h4>Kalium : {props.kalium}</h4>
                <h4>Temperatur : {props.temperature}º Celcius</h4>
                <h4>Kelembapan : {props.humidity}%</h4>
                <h4>Prediksi : {props.prediction}</h4>
                <h4>Akurasi : {props.accuracy}</h4>
            </div>
            <div className="status-item__actions">
                <Button inverse onClick={openStatusHandler}>Histori</Button>
                {auth.userId === props.creator && <Button to={`/plant/${props.id}`}>Edit</Button>}
                {auth.userId === props.creator && <Button to={`/plant/${props.id}/stats`}>Update Status</Button>}
                {auth.userId === props.creator && <Button danger onClick={showDeleteWarningHandler}>Hapus</Button>}
            </div>
            </Card>
        </li>
        </React.Fragment>
    );
};

export default StatusItem;