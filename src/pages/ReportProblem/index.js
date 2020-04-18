import React, { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import api from '~/services/api';

import { Container, TopBox, ProblemDescription, SubmitButton } from './styles';

export default function ReportProblem({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();

  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const response = await api.post(`deliveries/${id}/problems`, {
        description: problem,
      });
      setIsLoading(false);

      if (!response.data) {
        Alert.alert('Erro', 'Não foi possível registrar o problema');
        return;
      }

      Alert.alert('Problema registrado com sucesso!');
      navigation.dispatch(CommonActions.goBack());
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível registrar o problema');
    }
  }

  return (
    <Container>
      <TopBox />
      <ProblemDescription
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        placeholderTextColor="#999"
        multiline
        style={{ fontSize: 16 }}
        onChangeText={(text) => setProblem(text)}
      />
      <SubmitButton loading={isLoading} onPress={handleSubmit}>
        Enviar
      </SubmitButton>
    </Container>
  );
}

ReportProblem.propTypes = {
  route: PropTypes.object.isRequired,
};
