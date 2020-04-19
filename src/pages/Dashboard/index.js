import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { utcToZonedTime, format } from 'date-fns-tz';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ActivityIndicator } from 'react-native';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import {
  Container,
  Header,
  User,
  UserImage,
  UserInfo,
  Welcome,
  UserName,
  LogoutButton,
  TopRow,
  Title,
  OptionsWrapper,
  PendingOption,
  DeliveredOption,
  OptionText,
  DeliveriesList,
  CardContainer,
  CardHeader,
  CardHeaderText,
  CardContent,
  ProgressBar,
  PointWrapper,
  Line,
  Point,
  PointText,
  CardFooter,
  Info,
  InfoTitle,
  InfoData,
  DetailsButton,
  DetailsText,
  EmptyMessage,
  EmptyText,
} from './styles';

const pattern = 'dd/MM/yyyy';
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

function Card({ delivery }) {
  const zonedDate = utcToZonedTime(delivery.createdAt, timeZone);
  const formattedDate = format(zonedDate, pattern);

  const navigation = useNavigation();

  return (
    <CardContainer>
      <CardHeader>
        <Icon name="truck" color="#7d40e7" size={27} />
        <CardHeaderText>{`Encomenda ${delivery.id}`}</CardHeaderText>
      </CardHeader>
      <CardContent>
        <ProgressBar>
          <PointWrapper>
            <Line />
            <>
              <Point completed>
                <PointText>Aguardando Retirada</PointText>
              </Point>

              <Point completed={delivery.start_date || delivery.end_date}>
                <PointText>Retirada</PointText>
              </Point>

              <Point completed={delivery.end_date}>
                <PointText>Entregue</PointText>
              </Point>
            </>
          </PointWrapper>
        </ProgressBar>
      </CardContent>
      <CardFooter>
        <Info>
          <InfoTitle>Data</InfoTitle>
          <InfoData>{formattedDate}</InfoData>
        </Info>
        <Info>
          <InfoTitle>Cidade</InfoTitle>
          <InfoData>{delivery.recipient.city}</InfoData>
        </Info>
        <DetailsButton
          onPress={() => navigation.navigate('Details', { delivery })}
        >
          <DetailsText>Ver detalhes</DetailsText>
        </DetailsButton>
      </CardFooter>
    </CardContainer>
  );
}

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [deliveries, setDeliveries] = useState([]);
  const [pending, setPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    dispatch(signOut());
  }

  async function loadData() {
    if (pending) {
      setIsLoading(true);
      const response = await api.get(`deliverymens/${user.id}/deliveries`, {
        params: {
          delivered: 'not',
        },
      });
      setIsLoading(false);
      setDeliveries(response.data);
      return;
    }

    setIsLoading(true);
    const response = await api.get(`deliverymens/${user.id}/deliveries`, {
      params: {
        delivered: 'yes',
      },
    });
    setIsLoading(false);

    setDeliveries(response.data);
  }

  useEffect(() => {
    loadData();
  }, [pending]);

  return (
    <Container>
      <Header>
        <User>
          <UserImage
            source={{
              uri:
                user.avatar.url ||
                `https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${user.name.replace(
                  /\s/g,
                  '+'
                )}`,
            }}
          />
          <UserInfo>
            <Welcome>Bem vindo de volta,</Welcome>
            <UserName>{user.name}</UserName>
          </UserInfo>
        </User>
        <LogoutButton onPress={handleLogout}>
          <Icon name="logout" size={30} color="#E74040" />
        </LogoutButton>
      </Header>
      <TopRow>
        <Title>Entregas</Title>
        <OptionsWrapper>
          <PendingOption selected={pending} onPress={() => setPending(true)}>
            <OptionText selected={pending}>Pendentes</OptionText>
          </PendingOption>
          <DeliveredOption
            selected={!pending}
            onPress={() => setPending(false)}
          >
            <OptionText selected={!pending}>Entregues</OptionText>
          </DeliveredOption>
        </OptionsWrapper>
      </TopRow>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : deliveries.length > 0 ? (
        <DeliveriesList
          data={deliveries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card delivery={item} />}
        />
      ) : (
        <EmptyMessage>
          <EmptyText>Não temos nada aqui por enquanto...</EmptyText>
        </EmptyMessage>
      )}
    </Container>
  );
}

Card.propTypes = {
  delivery: PropTypes.object,
};
