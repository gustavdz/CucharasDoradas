import React from "react";
import { View, Text } from "react-native";
import {Button} from "react-native-elements";
import * as firebase from 'firebase';
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged() {
    return (
        <View>
            <InfoUser />
            <Button
                title='Cerrar Sesión'
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    );
}
