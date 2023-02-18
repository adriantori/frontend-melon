import React, { useContext, useEffect, useState }from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlantForm.css';


const UpdateStats = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest,clearError } = useHttpClient();
    const [loadedPlant, setLoadedPlants] = useState();
    const plantId = useParams().plantId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        ph: {
            value: '',
            isValid: false
        },
        nitrogen: {
            value: '',
            isValid: false
        },
        phospor: {
            value: '',
            isValid: false
        },
        kalium: {
            value: '',
            isValid: false
        },
        temperature: {
            value: '',
            isValid: false
        },
        humidity: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlant = async () => {
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}`);
                setLoadedPlants(responseData.plant);
                setFormData(
                    {
                        title: {
                            value: responseData.plant.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.plant.description,
                            isValid: true
                        }
                    },
                    true
                    );
            }catch(err){}
        }
        fetchPlant();
    }, [sendRequest, plantId, setFormData]);
   

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        //update backend
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}/stats`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                ph: formState.inputs.ph.value,
                nitrogen: formState.inputs.nitrogen.value,
                phospor: formState.inputs.phospor.value,
                kalium: formState.inputs.kalium.value,
                temperature: formState.inputs.temperature.value,
                humidity: formState.inputs.humidity.value
            }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            console.log('updated');
        }catch(err){}
        //insert history
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}/stats`, 'POST', JSON.stringify({
                id: plantId,
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                ph: formState.inputs.ph.value,
                nitrogen: formState.inputs.nitrogen.value,
                phospor: formState.inputs.phospor.value,
                kalium: formState.inputs.kalium.value,
                temperature: formState.inputs.temperature.value,
                humidity: formState.inputs.humidity.value,
                date: new Date( new Date().getTime())
            }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/' + plantId + '/status');
            console.log('history created');
        }catch(err){}
    };

    if (isLoading){
        return (
        <div className="center">
            <LoadingSpinner />
        </div>
        );
    };

    if (!loadedPlant && !error){
        return (
        <div className="center">
            <h2>Tidak dapat menemukan tanaman</h2>
        </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedPlant && <form className="plant-form" onSubmit={placeUpdateSubmitHandler}>
                <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Nama Tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nama yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.title}
                initialValid={true}
                />
                <Input 
                id="description" 
                element="textarea" 
                label="Deskripsi Tanaman" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Masukkan deskripsi yang valid (minimal 5 karakter)" 
                onInput={inputHandler}
                initialValue={loadedPlant.description}
                initialValid={true}
                />
                <Input 
                id="ph" 
                element="text" 
                label="pH tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai pH yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.ph}
                />
                <Input 
                id="nitrogen" 
                element="text" 
                label="Nitrogen tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai Nitrogen yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.nitrogen}
                />
                <Input 
                id="phospor" 
                element="text" 
                label="Fosfor tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai Fosfor yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.phospor}
                />
                <Input 
                id="kalium" 
                element="text" 
                label="Kalium tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai Kalium yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.kalium}
                />
                <Input 
                id="temperature" 
                element="text" 
                label="Temperatur tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai Temperatur yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.temperature}
                />
                <Input 
                id="humidity" 
                element="text" 
                label="Kelembapan tanaman" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Masukkan nilai Kelembapan yang valid" 
                onInput={inputHandler}
                initialValue={loadedPlant.humidity}
                />
                <Button type="submit" disabled={!formState.isValid}>Update Tanaman</Button>
            </form>}
        </React.Fragment>
    
    )
};

export default UpdateStats;