import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
    const dispatch = useDispatch();

    const [id, setId] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handdleSubmit() {
        dispatch(signInRequest(id));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        keyboardType="number-pad"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Informe seu ID de cadastro"
                        returnKeyType="send"
                        onSubmitEditing={handdleSubmit}
                        value={id}
                        onChangeText={setId}
                    />

                    <SubmitButton loading={loading} onPress={handdleSubmit}>
                        Entrar no sistema
                    </SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}
