import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Dimensions} from "react-native";

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        // Add your login logic here
        navigation.replace('Main');
    };

    return (
        <View style={styles.desktopview}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Login" onPress={handleLogin}/>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    desktopview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'white',
    },
});

export default LoginScreen;