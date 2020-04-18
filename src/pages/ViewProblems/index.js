import React, { useState, useEffect } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  TopBox,
  Title,
  ProblemsList,
  CardContainer,
  ProblemDescription,
  ProblemDate,
  EmptyMessage,
  EmptyText,
  Loading,
} from './styles';

import api from '~/services/api';

const pattern = 'dd/MM/yyyy';
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

function Card({ problem }) {
  const zonedDate = utcToZonedTime(problem.createdAt, timeZone);
  const problemDate = format(zonedDate, pattern);

  return (
    <CardContainer>
      <ProblemDescription>{problem.description}</ProblemDescription>
      <ProblemDate>{problemDate}</ProblemDate>
    </CardContainer>
  );
}

export default function ViewProblems({ route }) {
  const { id } = route.params;
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadData() {
    try {
      setIsLoading(true);
      const response = await api.get(`deliveries/${id}/problems`);
      setIsLoading(false);
      setProblems(response.data);
    } catch (err) {
      Alert.alert('Não foi possível exibir os problemas');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <TopBox />
      <Title>{`Encomenda ${id}`}</Title>

      {isLoading ? (
        <Loading size="large" />
      ) : problems.length > 0 ? (
        <ProblemsList
          data={problems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card problem={item} />}
        />
      ) : (
        <EmptyMessage>
          <EmptyText>Nenhum problema registrado nesta encomenda</EmptyText>
          <Icon name="check-circle-outline" size={50} color="#7D40E7" />
        </EmptyMessage>
      )}
    </Container>
  );
}

ViewProblems.propTypes = {
  route: PropTypes.object.isRequired,
};

Card.propTypes = {
  problem: PropTypes.object.isRequired,
};
