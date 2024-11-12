import { useState } from 'react';
import { Button, View, useWindowDimensions, Text } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { createStackNavigator } from '@react-navigation/stack';
import data from '../../assets/complexObject.json'
import { RenderJsonObjectComponent } from './RenderJsonObjectComponent';
import { UserPage } from './User/UserPage';
import { CreateUserRoute } from './User/CreateUserRoute';
import { EditUserRoute } from './User/EditUserRoute';
import { ThirdRoute } from './ThirdRoute';

const FirstRoute = () => {

    return (
        // <Stack.Navigator initialRouteName="RenderJsonObjectComponent">
        //     <Stack.Screen
        //         name="RenderJsonObjectComponent"
        //         component={RenderJsonObjectComponent}
        //         initialParams={{ data: data }}
        //         options={({ route }) => ({ title: route.params?.headerTitle || 'Data' })}
        //     />
        // </Stack.Navigator>
        <></>
    );
}

const SecondRoute = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#673ab7' }}>
            <Button
                title="Open First Activity"
                color="#841584"
                onPress={() => navigation.navigate("Counter Page")} />
        </View>)
};



export const TabViewHolder = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' }
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute />;
            case 'second':
                return <SecondRoute navigation={navigation} />;
            case 'third':
                return <ThirdRoute />
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}