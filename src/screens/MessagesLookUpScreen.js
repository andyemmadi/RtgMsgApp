import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import RTGLogo from '../components/RTGLogo';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        fontFamily: 'Poppins-Regular',
    },
    topContainer: {
        flex: 0.5,
        //justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 320,
        height: 20,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 24,
        margin: 20,
        fontFamily: 'Poppins-Regular',
    },
    text: {
        fontSize: 16,
        margin: 20,
        fontFamily: 'Poppins-Regular',
    },
    input: {
        fontSize: 16,
        height: 40,
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        margin: 20,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
    },
    mar40: {
        margin: 40,
    },

    bottomContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
    },

    btnWrapper: {
        marginTop: 50,
        backgroundColor: '#004FB5',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        borderRadius: 25,
        margin: 25,

    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    loader: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});



const MessagesLookUpScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    React.useEffect(() => {
        navigation.setOptions({ headerShown: false });
    });

    const noUserFoundAlert = () => {
        Alert.alert('User Not Found', 'Please check the email you have entered', [{ text: 'Ok' }]);
    };

    const errorOccuredAlert = () => {
        Alert.alert('Oops !', 'An error occure while retriving the messages, Please try again.', [{ text: 'Close' }]);
    };

    const fetchMsgsAPI = () => {
        const url = `https://vcp79yttk9.execute-api.us-east-1.amazonaws.com/messages/users/${email}`;
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                if (Array.isArray(data)) {
                    setEmail('');
                    const sortedData = data.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    });
                    navigation.navigate('MessageCenter', { messages: sortedData });
                } else {
                    const errorKey = Object.keys(data);
                    if (data[errorKey] === 'User not found') {
                        noUserFoundAlert();
                    } else if (data[errorKey] === 'Internal Server Error') {
                        errorOccuredAlert();
                    }
                }
            }).catch(error => {
                console.error('error ', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? <ActivityIndicator size={'large'} style={styles.loader} /> :
                    <>
                        <View style={styles.topContainer}>
                            <View style={styles.mar40}>
                                <RTGLogo />
                            </View>
                            <Text style={styles.title}>Messages Center</Text>
                            <Text style={styles.text}>Enter your email to search for your messages</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Enter your email address"
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.btnWrapper} onPress={fetchMsgsAPI} disabled={!email}>
                                <Text style={styles.btnText}> Search </Text>
                            </TouchableOpacity>
                        </View>
                    </>
            }
        </SafeAreaView>);
};

export default MessagesLookUpScreen;
