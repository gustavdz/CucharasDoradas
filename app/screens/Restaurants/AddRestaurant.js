import React from "react";
import { StyleSheet, View, Text} from "react-native";

export default function AddRestaurant() {
    return(
        <View style={styles.view}>
            <Text>Add Restaurant</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
});
