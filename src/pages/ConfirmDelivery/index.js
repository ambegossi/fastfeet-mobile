import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCamera } from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  TopBox,
  PictureButton,
  SubmitButton,
  Camera,
  Picture,
  PictureWrapper,
} from './styles';

import api from '~/services/api';

export default function ConfirmDelivery({ initialProps, route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint },
    { takePicture },
  ] = useCamera(initialProps);

  const [takenPicture, setTakenPicture] = useState(null);

  async function handlePicture() {
    const data = await takePicture({ quality: 0.5 });
    setTakenPicture(data);
  }

  async function handleSubmit() {
    try {
      const data = new FormData();
      data.append('file', {
        uri: takenPicture.uri,
        name: 'deliverySignature.jpg',
        type: 'image/jpeg',
      });
      setIsLoading(true);
      const response = await api.post('files', data);
      const signatureId = response.data.id;

      const dateTime = new Date();
      const endDate = dateTime.toISOString().replace('Z', '');

      await api.put(`deliveries/${id}`, {
        signature_id: signatureId,
        end_date: endDate,
      });
      setIsLoading(false);
      Alert.alert('Entrega confirmada com sucesso!');
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível confirmar a entrega');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <TopBox />
      <PictureWrapper>
        {takenPicture ? (
          <Picture source={{ uri: takenPicture.uri }} />
        ) : (
          <>
            <Camera
              ref={cameraRef}
              autoFocusPointOfInterest={autoFocusPoint.normalized}
              type={type}
              ratio={ratio}
              autoFocus={autoFocus}
            />
            <PictureButton onPress={handlePicture}>
              <Icon name="camera" size={29} color="#fff" />
            </PictureButton>
          </>
        )}
      </PictureWrapper>

      <SubmitButton loading={isLoading} onPress={handleSubmit}>
        Enviar
      </SubmitButton>
    </Container>
  );
}

ConfirmDelivery.propTypes = {
  initialProps: PropTypes.object,
  route: PropTypes.object.isRequired,
};
