<<<<<<< HEAD
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


const UpdatePlant = () => {
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
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/' + plantId + '/status');
            console.log('updated');
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
                errorText="Mohon masukkan nama tanaman" 
                onInput={inputHandler}
                initialValue={loadedPlant.title}
                initialValid={true}
                />
                <Input 
                id="description" 
                element="textarea" 
                label="Deskripsi" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Mohon masukkan deskripsi yang valid (minimal 5 karakter)" 
                onInput={inputHandler}
                initialValue={loadedPlant.description}
                initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>Update Plant</Button>
            </form>}
        </React.Fragment>
    
    )
};

=======
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


const UpdatePlant = () => {
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
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            history.push('/' + plantId + '/status');
            console.log('updated');
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
                errorText="Mohon masukkan nama tanaman" 
                onInput={inputHandler}
                initialValue={loadedPlant.title}
                initialValid={true}
                />
                <Input 
                id="description" 
                element="textarea" 
                label="Deskripsi" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Mohon masukkan deskripsi yang valid (minimal 5 karakter)" 
                onInput={inputHandler}
                initialValue={loadedPlant.description}
                initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>Update Plant</Button>
            </form>}
        </React.Fragment>
    
    )
};

>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
export default UpdatePlant;