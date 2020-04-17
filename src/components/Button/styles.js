import styled from 'styled-components';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 325px;
  height: 45px;
  background-color: #82bf18;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
`;
