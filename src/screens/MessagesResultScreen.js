import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 20,
        fontFamily: 'Poppins-Regular',
    },
    msg: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        fontSize: 14,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    msgText: {
        flex: 7,
    },
    msgDate: {
        flex: 3,
        alignItems: 'flex-end',
    },
    noMsgText: {
        alignSelf: 'center',
    },
    poppinsText: {
        fontFamily: 'Poppins-Regular',
    },
});



const MessagesResultScreen = ({ navigation, route }) => {

    const [messages, setMessages] = useState(route.params.messages);
    const renderItem = ({ item }) => (
        <View style={styles.msg}>
            <View style={styles.msgText}>
                <Text style={styles.poppinsText}>{item.message}</Text>
            </View>
            <View style={styles.msgDate}>
                <Text style={styles.poppinsText}>{moment(item.date).format('L')}</Text>
            </View>
        </View>
    );

    const emptyMessageText = () => {
        return <View style={styles.noMsgText}>
            <Text>No Message Found</Text>
        </View>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Message Center</Text>
            {<FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.date + index}
                ListEmptyComponent={emptyMessageText}
            />}
        </SafeAreaView>);
};

export default MessagesResultScreen;
