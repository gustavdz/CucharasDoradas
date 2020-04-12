import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Dimensions} from "react-native";
import Carousel from "../../components/Carousel";
import * as firebase from "firebase";

export default function Restaurant(props) {
    const {route} = props;
    const { restaurant } = route.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const screenWidth = Dimensions.get('window').width;

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
            <Carousel
                arrayImages={imagesRestaurant}
                width={screenWidth}
                height={200}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});
