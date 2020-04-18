import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { utcToZonedTime, format } from 'date-fns-tz';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  TopBox,
  CardInfo,
  CardHeader,
  CardHeaderText,
  CardItem,
  CardItemTitle,
  CardItemText,
  CardStatus,
  CardDate,
  ButtonsWrapper,
  AddProblemButton,
  ButtonText,
  ViewProblemButton,
  ConfirmButton,
} from './styles';

const pattern = 'dd/MM/yyyy';
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

export default function Details({ route }) {
  const navigation = useNavigation();
  const { delivery } = route.params;
  const { recipient } = delivery;

  const zonedStartDate =
    delivery.start_date && utcToZonedTime(delivery.start_date, timeZone);
  const startDate = zonedStartDate
    ? format(zonedStartDate, pattern)
    : '--/--/--';

  const zonedEndDate =
    delivery.end_date && utcToZonedTime(delivery.end_date, timeZone);
  const endDate = zonedEndDate ? format(zonedEndDate, pattern) : '--/--/--';

  const status =
    delivery.start_date &&
    delivery.end_date === null &&
    delivery.canceled_at === null
      ? 'Retirada'
      : delivery.canceled_at
      ? 'Cancelada'
      : delivery.end_date
      ? 'Entregue'
      : delivery.start_date === null
      ? 'Pendente'
      : null;

  return (
    <Container>
      <TopBox>
        <CardInfo>
          <CardHeader>
            <Icon name="truck" color="#7d40e7" size={27} />
            <CardHeaderText>Informações da entrega</CardHeaderText>
          </CardHeader>
          <CardItem>
            <CardItemTitle>Destinatário</CardItemTitle>
            <CardItemText>{recipient.name}</CardItemText>
          </CardItem>
          <CardItem>
            <CardItemTitle>Endereço de entrega</CardItemTitle>
            <CardItemText>{`${recipient.street}, ${recipient.street_number}, ${recipient.city} - ${recipient.state}, ${recipient.zip_code}`}</CardItemText>
          </CardItem>
          <CardItem>
            <CardItemTitle>Produto</CardItemTitle>
            <CardItemText>{delivery.product}</CardItemText>
          </CardItem>
        </CardInfo>
        <CardStatus>
          <CardHeader>
            <Icon name="calendar" color="#7d40e7" size={27} />
            <CardHeaderText>Situação da entrega</CardHeaderText>
          </CardHeader>
          <CardItem>
            <CardItemTitle>Status</CardItemTitle>
            <CardItemText>{status}</CardItemText>
          </CardItem>
          <CardDate>
            <CardItem>
              <CardItemTitle>Data de retirada</CardItemTitle>
              <CardItemText>{startDate}</CardItemText>
            </CardItem>
            <CardItem>
              <CardItemTitle>Data de entrega</CardItemTitle>
              <CardItemText>{endDate}</CardItemText>
            </CardItem>
          </CardDate>
        </CardStatus>
      </TopBox>
      <ButtonsWrapper>
        <AddProblemButton
          onPress={() =>
            navigation.navigate('ReportProblem', { id: delivery.id })
          }
        >
          <Icon name="close-circle-outline" size={22} color="#E74040" />
          <ButtonText>Informar Problema</ButtonText>
        </AddProblemButton>
        <ViewProblemButton
          onPress={() =>
            navigation.navigate('ViewProblems', { id: delivery.id })
          }
        >
          <Icon name="information-outline" size={22} color="#E7BA40" />
          <ButtonText>Visualizar Problemas</ButtonText>
        </ViewProblemButton>
        <ConfirmButton
          onPress={() =>
            navigation.navigate('ViewProblems', { id: delivery.id })
          }
        >
          <Icon name="check-circle-outline" size={22} color="#7D40E7" />
          <ButtonText>Confirmar entrega</ButtonText>
        </ConfirmButton>
      </ButtonsWrapper>
    </Container>
  );
}

Details.propTypes = {
  route: PropTypes.object.isRequired,
};
