import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Logo, FormInput, SubmitButton } from './styles';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [input, setInput] = useState();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(input));
  }

  return (
    <Container>
      <Logo source={logo} />
      <FormInput
        placeholder="Informe seu ID de cadastro"
        placeholderTextColor="#999999"
        onChangeText={setInput}
        value={input}
      />
      <SubmitButton loading={loading} onPress={() => handleSubmit()}>
        Entrar no sistema
      </SubmitButton>
    </Container>
  );
}
