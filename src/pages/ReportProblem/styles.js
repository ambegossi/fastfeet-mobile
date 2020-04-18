import styled from 'styled-components/native';
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

export const ProblemDescription = styled.TextInput`
  height: 300px;
  width: 85%;
  border: 1px solid #0000001a;
  background-color: #ffffff;
  margin-top: 80px;
  margin-bottom: 20px;
  border-radius: 4px;
  padding: 15px;
`;

export const SubmitButton = styled(Button)`
  background-color: #7d40e7;
  width: 85%;
`;
