import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text} from "react-native";
import * as firebase from "firebase";
export default function Restaurant(props) {
    const {route} = props;
    const { restaurant } = route.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    
    useEffect(() => {
        const arrayUrls = [];
        (async () =>{
            await Promise.all(
                restaurant.images.map(async idImage => {
                    await firebase
                        .storage()
                        .ref(`restaurant-images/${idImage}`)
                        .getDownloadURL()
                        .then(imageUrl => {
                            arrayUrls.push(imageUrl);
                        });
                })
            );
            setImagesRestaurant(arrayUrls);
        })();
    },[]);

    return (
        <View>
            <Text>Página del restaurante...</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
