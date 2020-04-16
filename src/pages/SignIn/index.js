import React from 'react';

import { Container, Logo, FormInput, FormButton, ButtonText } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSubmit() {}

  return (
    <Container>
      <Logo source={logo} />
      <FormInput
        placeholder="Informe seu ID de cadastro"
        placeholderTextColor="#999999"
      />
      <FormButton onPress={() => handleSubmit()}>
        <ButtonText>Entrar no sistema</ButtonText>
      </FormButton>
    </Container>
  );
}
