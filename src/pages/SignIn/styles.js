import styled from 'styled-components';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #7d40e7;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 50px;
  margin-bottom: 35px;
`;

export const FormInput = styled.TextInput`
  width: 325px;
  height: 45px;
  background-color: #fff;
  border-radius: 4px;
  padding: 0 20px;
  border: 1px solid #ddd;
  margin-bottom: 16px;
`;

export const FormButton = styled(RectButton)`
  width: 325px;
  height: 45px;
  background-color: #82bf18;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
`;
