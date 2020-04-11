import React, {useRef, useState} from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";

export default function AddRestaurant(props) {
    const {navigation} = props;
    const toastRef = useRef();
    const [isLoading,setIsLoading] = useState(false);

    return(
        <View style={styles.view}>
            <AddRestaurantForm navigation={navigation} toastRef={toastRef} setIsLoading={setIsLoading} />
            <Loading isVisible={isLoading} text='Creando restaurante' />
            <Toast ref={toastRef} position='center' opacity={0.5} />
        </View>
    );
}

const styles = StyleSheet.create({
    // view: {
    //     alignItems: 'center',
    //     paddingTop: 10,
    //     paddingBottom: 10
    // },
});
