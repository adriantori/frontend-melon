import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlantForm.css';

const NewPlant = () => {
  const auth = useContext(AuthContext); //add current user
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
        },
        false
    );

    const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(process.env.REACT_APP_BACKEND_URL + '/plants/', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      console.log(formData);
      //redirect
      history.push('/');
    }catch(err){}
    
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form className="plant-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="title"
        element="input"
        type="text"
        label="Nama Tanaman"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Mohon masukkan nama tanaman yang valid"
        onInput={inputHandler}
      />
        {/* input template */}
      <Input
        id="description"
        element="textarea"
        label="Deskripsi"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Mohon masukkan deskripsi yang valid (minimal 5 karakter)"
        onInput={inputHandler}
      />
      <ImageUpload id="image" onInput={inputHandler} errorText="Mohon pilih gambar tanaman"/>
      <Button type="submit" disabled={!formState.isValid}>
        Tambahkan Tanaman
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlant;
