import styled from 'styled-components';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const UserInfo = styled.View`
  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin-bottom: 30px;
`;

export const UserField = styled.View`
  width: 305px;
  margin-top: 15px;
`;

export const Title = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const UserData = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 22px;
`;

export const LogoutButton = styled(RectButton)`
  margin-top: 30px;
  background-color: #e74040;
  width: 305px;
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
