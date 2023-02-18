import React, { useEffect, useState } from 'react';

import PlantList from '../component/PlantList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Plants = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlants, setLoadedPlants] = useState();

    useEffect(() => {
        const fetchPlant = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/plants/');
                
                setLoadedPlants(responseData.plants);
            }catch (err){}
        }
        fetchPlant();
    }, [sendRequest]);

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedPlants && <PlantList items={loadedPlants}/>}
        </React.Fragment>;
}

export default Plants;