import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView} from "react-native";
import { Rating, ListItem } from "react-native-elements";
import Carousel from "../../components/Carousel";
import * as firebase from "firebase";
import Map from "../../components/Map";

export default function Restaurant(props) {
    const {route} = props;
    const { restaurant } = route.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const arrayUrls = [];
        (async () => {
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
        <ScrollView style={styles.viewBody}>
            <Carousel
                arrayImages={imagesRestaurant}
                width={screenWidth}
                height={250}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
        </ScrollView>
    );
}

function TitleRestaurant(props) {
    const {name, description, rating} = props;
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    );
}

function RestaurantInfo (props){
    const {location, name, address} = props;

    const listInfo = [
        {
            text: address,
            iconName: 'map-marker',
            icontype: 'material-community',
            action: null
        }
        ,{
            text: '111 222 3333',
            iconName: 'phone',
            icontype: 'material-community',
            action: null
        }
        ,{
            text: 'asdf@email.com',
            iconName: 'at',
            icontype: 'material-community',
            action: null
        }
    ];

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>Informacion sobre el restaurante</Text>
            <Map location={location} name={name} height={100}/>
            {listInfo.map((item,index)=>(
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name:item.iconName,
                        type: item.icontype,
                        color: '#00a680'
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor:'white'
    },
    viewRestaurantTitle: {
        margin: 15
    },
    nameRestaurant: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    rating: {
        position: 'absolute',
        right: 0
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: 'grey'
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1
    }
});
