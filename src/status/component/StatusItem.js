import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StatusItem.css"
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const StatusItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const[showStatus, setShowStatus] = useState(false);
    const[showTutorial, setTutorialStatus] = useState(false);
    const[showConfirmModal, setShowConfirmModal] = useState(false);

    const openStatusHandler = () => setShowStatus(true);
    const closeStatusHandler = () => setShowStatus(false);

    const openTutorialHandler = () => setTutorialStatus(true);
    const closeTutorialHandler = () => setTutorialStatus(false);

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

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );
    
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
                    <h4>Humiditas : {props.humidity}%</h4>
                    <ColoredLine color="red" />
                    <h4 tyle={{color: "red"}}>Prediksi : {props.prediction}</h4>
                    <ColoredLine color="red" />
                    <h4>Tingkat Akurasi Prediksi : {props.accuracy}%</h4>
                    </div>
                </div>
            </Modal>

            <Modal 
            show={showTutorial}
            onCancel={closeTutorialHandler}
            header="Cara Membaca Data"
            contentClass="status-item__modal-content"
            footerClass="status-item__modal-actions"
            footer={<Button onClick={closeTutorialHandler}>Tutup</Button>}>
                <div className="status-container">
                    <div className="status-item__info">
                    <h2>Nama dan Deskripsi</h2>
                    <h4>Merupakan nama dan deskripsi tanaman</h4>
                    <h2>Status Tanaman</h2>
                    <h4>Meliputi pH, nitrogen, fosfor, kalium, temperatur, dan humiditas</h4>
                    <h4>Nilai ini didapatkan secara otomatis via sensor atau di-inputkan manual melalui menu Update Status</h4>
                    <h4>Angka didalam kurung () merupakan nilai optimal</h4>
                    <h2>Prediksi dan Akurasi</h2>
                    <h4>Merupakan hasil Sistem Pakar dan tingkat akurasi</h4>
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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }}>
                        <Grid item xs={3}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>pH</b> <br/>
                                <b>(6-7)</b> <br/>
                                {props.ph}                          
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>Nitrogen</b> <br/>
                                <b>(11-14)</b> <br/>
                                {props.nitrogen}
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>Fosfor</b> <br/>
                                <b>(5-6)</b> <br/>
                                {props.phospor}
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>Kalium</b> <br/>
                                <b>(25-33)</b> <br/>
                                {props.kalium}
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>Temperatur</b> <br/>
                                <b>(15-39)</b> <br/>
                                <CircularProgressbar value={props.temperature} maxValue={100} text={props.humidity + `º Celcius`} />
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item sx={{ p: 2, border: '1px solid grey', backgroundColor: 'primary.dark', color: 'white'}}>
                                <b>Humiditas</b> <br/>
                                <b>(60-75)</b> <br/>
                                <CircularProgressbar value={props.humidity} maxValue={100} text={props.humidity + `%`} />
                            </Item>
                        </Grid>
                    </Grid>
                <ColoredLine color="red" />
                <h4>Prediksi : {props.prediction}</h4>
                <ColoredLine color="red" />
                <h4>Tingkat Akurasi Prediksi : {props.accuracy}</h4>
            </div>
            <div className="status-item__actions">
                <Button inverse onClick={openStatusHandler}>Histori</Button>
                <Button inverse onClick={openTutorialHandler}>Tutorial</Button>
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