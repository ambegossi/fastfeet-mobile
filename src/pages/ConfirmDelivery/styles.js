import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

export const TopBox = styled.View`
  width: 100%;
  height: 155px;
  background-color: #7d40e7;
  align-items: center;
  position: absolute;
`;

export const PictureButton = styled.TouchableOpacity`
  margin-top: -40px;
  width: 61px;
  height: 61px;
  border-radius: 30.5px;
  align-self: center;
  background-color: #0000004d;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  background-color: #7d40e7;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Picture = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const PictureWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: black;
  width: 70%;
  margin-top: 80px;
`;
