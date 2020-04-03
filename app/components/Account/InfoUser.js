import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props) {
    const {
        userInfo,
        userInfo: { photoURL, uid, displayName, email}
    } = props;
    console.log(userInfo);

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        if (resultPermissionCamera === 'denied'){
            console.log('Es necesario aceptar los permisos de la cámara');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                console.log('Has cancelado la selección de una imagen.')
            } else {
                uploadImage(result.uri, uid);
            }
        }
    };

    const uploadImage = (uri, nameImage) => {
        console.log ('URI: ' + uri);
        console.log ('nameImage: ' + nameImage);
    };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size='large'
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri:photoURL ? photoURL : 'https://api.adorable.io/avatars/266/abott@adorable.png'
                }}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : 'Anónimo'}</Text>
                <Text>{email ? email : 'Social Login'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingBottom: 30,
        paddingTop: 30
    },
    userInfoAvatar: {
        marginRight: 30
    },
    displayName: {
        fontWeight: 'bold',

    }

});
