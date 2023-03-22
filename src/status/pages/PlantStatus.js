import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import StatusList from '../component/StatusList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const PlantStatus = () => {
  const [loadedPlants, setLoadedPlants] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const plantId = useParams().plantId;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/plants/${plantId}`
        );
        setLoadedPlants(responseData.plant);
      } catch (err) {}
    };
    fetchPlants();
  }, [sendRequest, plantId]);

  const plantDeletedHandler = (deletedPlantId) => {
    //setLoadedPlants(prevPlants => prevPlants.filter(plant => plant.id !== deletedPlantId));
    history.push('/plants');
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlants && <StatusList items={[loadedPlants]} onDeletePlant={plantDeletedHandler} />}
    </React.Fragment>
  );
};

export default PlantStatus;
