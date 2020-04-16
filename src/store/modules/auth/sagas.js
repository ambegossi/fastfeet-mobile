import { Alert } from 'react-native';

import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, 'deliverymens', {
      params: { id },
    });

    if (!response.data) {
      Alert.alert('Falha no login', 'Nenhum entregador encontrado');
      return;
    }

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha no login', 'Verifique seu ID');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
