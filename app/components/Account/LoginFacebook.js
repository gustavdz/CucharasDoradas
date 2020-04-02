import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';
import { FacebookApi } from '../../utils/Social';
import Loading from "../Loading";

export default function LoginFacebook(props) {
    const {toastRef, navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    const login = async () => {
        await Facebook.initializeAsync(FacebookApi.application_id);
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            {permissions: FacebookApi.permissions}
            );

        if(type ==='success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase
                .auth()
                .signInWithCredential(credentials)
                .then(() => {
                    setIsLoading(true);
                    navigation.navigate('Mi Cuenta');
                })
                .catch(() => {
                    toastRef.current.show('Error accediendo con Facebook, intentelo de nuevo más tarde');
                })
        } else if (type === 'cancel') {
            toastRef.current.show('Inicio de sesión cancelado');
        } else {
            toastRef.current.show('Error desconocido, intentelo de nuevo más tarde');
        }
        setIsLoading(false);
    };

    return (
        <>
            <SocialIcon
                title='Iniciar sesión con Facebook'
                button
                type='facebook'
                onPress={login}
            />
            <Loading isVisible={isLoading} text='Iniciando sesión' />
        </>
    );
}
