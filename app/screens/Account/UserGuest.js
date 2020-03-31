import React from "react";
import { StyleSheet, View, ScrollView, Text, Image} from "react-native";
import { Button } from "react-native-elements";

export default function UserGuest() {
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image
                source={require('../../../assets/img/original.jpg')}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.title}>Consulta tu perfil de Cucharas Doradas</Text>
            <Text style={styles.description}>
                ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla,
                vota cual te ha gustado más y comenta cómo ha sido tu experiencia.
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title='Ver tu Perfil'
                    onPress={() => console.log('Hello world')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        width: '100%',
        marginBottom: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        marginBottom: 20,
        textAlign: 'center',
    },
    viewBtn: {
        flex: 1,
        alignItems: 'center'
    },
    btnStyle: {
        backgroundColor: '#00a680'
    },
    btnContainer: {
        width: '70%'
    }
});