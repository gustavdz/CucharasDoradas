import React, {useState, useEffect} from "react";
import {StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../Modal";

const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const {toastRef, navigation, setIsLoading} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);

    const send = () => {
        console.log('RestaurantName = '+ restaurantName);
        console.log('RestaurantAddress = '+ restaurantAddress);
        console.log('RestaurantDescription = '+ restaurantDescription);
    };
    return(
        <ScrollView>
            <ImageRestaurant imageRestaurant={imagesSelected[0]}/>
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props;
    return (
        <View style={styles.viewPhoto}>
            {
                imageRestaurant ? (
                    <Image
                        source={{uri: imageRestaurant}}
                        style={
                            {
                                width: WidthScreen,
                                height: 200
                            }
                        }
                    />
                ) : (
                    <Image
                        source={require("../../../assets/img/defaultPortrait.png")}
                        style={
                            {
                                width: WidthScreen,
                                height: 200
                            }
                        }
                    />
                )
            }
        </View>
    );
}

function UploadImage(props) {
    const { imagesSelected, setImagesSelected, toastRef } = props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === 'denied') {
            toastRef.current.show('Es necesario aceptar los permisos de la galería, si los has rechazado tienes que ir a ajustes y activarlos manualmente', 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show('Has cerrado la galería sin asociar ninguna imagen', 3000);
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };

    const removeImage = image => {
        const arrayImages = imagesSelected;
        Alert.alert('Eliminar imagen',
            'Estás seguro que quieres eliminar la imagen?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image));
                    }
                }
            ],
            {cancelable: false}
        )
    };

    return(
        <View style={styles.viewImages}>
            {imagesSelected.length<5 && (
                <Icon
                    type='material-community'
                    name='camera'
                    color='#7a7a7a'
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {
                imagesSelected.map( imageRestaurant => (
                    <Avatar
                        key={imageRestaurant}
                        onPress={ () => removeImage(imageRestaurant)}
                        style={styles.miniatureStyle}
                        source={{uri: imageRestaurant}}
                    />
                ))
            }
        </View>
    );
}

function FormAdd(props) {
    const { setRestaurantName, setRestaurantAddress, setRestaurantDescription, setIsVisibleMap, locationRestaurant } = props;
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder='Nombre del restaurante'
                containerStyle={styles.input}
                onChange={ e => setRestaurantName(e.nativeEvent.text) }
            />
            <Input
                placeholder='Dirección del restaurante'
                containerStyle={styles.input}
                onChange={ e => setRestaurantAddress(e.nativeEvent.text) }
                rightIcon={{
                    type: 'material-community',
                    name: 'google-maps',
                    color: locationRestaurant ? '#00a680' : '#c2c2c2',
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder='Descripción del restaurante'
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={ e => setRestaurantDescription(e.nativeEvent.text) }
            />
        </View>
    )
}

function Map(props) {
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } = props;
    const [location, setLocation] = useState(null);

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={ region => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable={true}
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title='Guardar Ubicación'
                        onPress={() => console.log('Ubicación guardada')}
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    />
                    <Button
                        title='Cancelar Ubicación'
                        onPress={() => setIsVisibleMap(false)}
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                    />
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3'
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    },
    mapStyle: {
        width: '100%',
        height: 550
    },
    viewMapBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    }
});

