import { Text, View, Button, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const formatString = (str) => {
    if (!str)
        return "";
    let formattedStr = str.replace(/_/g, " ");
    return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
}

const isImageUrl = (url) => {
    try {
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        const parsedUrl = new URL(url);
        return imageExtensions.test(parsedUrl.pathname);
    } catch (error) {
        return false;
    }
}

export const RenderJsonObjectComponent = ({ route }) => {
    const { data, depth = 0, headerTitle = '' } = route.params;
    const navigation = useNavigation()
    const screenWidth = Dimensions.get('window').width;

    const generateTree = (data, depth) => {

        return Object.keys(data).map((key) => {
            if (typeof data[key] === 'object' && !Array.isArray(data[key]) && data[key] !== null) {
                return (
                    <View key={`${depth}_${key}`} style={{ paddingLeft: 10, marginVertical: 5 }}>
                        <Button
                            title={formatString(key)}
                            onPress={() => navigation.push('RenderJsonObjectComponent', { data: data[key], depth: depth + 1, headerTitle: formatString(key) })}
                        />
                    </View>
                );
            } else if (Array.isArray(data[key])) {
                return (
                    <View key={`${depth}_${key}`} style={{ paddingLeft: 10, marginVertical: 5 }}>
                        <Button title={`${formatString(key)}. Size: ${data[key].length}`}
                            onPress={() => navigation.push('RenderJsonObjectComponent', { data: data[key], depth: depth + 1, headerTitle: formatString(key) })}
                            style={{ fontSize: 20 }}
                            color="#841584">

                        </Button>
                    </View>
                );
            } else {
                return (
                    <View key={`${depth}_${key}`} style={{ marginVertical: 8 }}>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 10, fontSize: 20 }}>
                            {formatString(key)}:
                        </Text>
                        {isImageUrl(data[key].toString()) ? (
                            <Image
                                source={{ uri: data[key] }}
                                style={{ height: 200, width: screenWidth }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
                                {data[key].toString()}
                            </Text>
                        )}
                    </View>
                );
            }
        })
    };

    if (typeof data !== 'object') {
        return <Text>ERROR: Not a json object</Text>
    }

    return (
        <>
            {!Array.isArray(data)
                ? <ScrollView>{generateTree(data, depth)}</ScrollView>
                : <FlatList
                    data={data}
                    renderItem={({ item }) => <ObjectListItem navigation={navigation} object={item} objectKey={headerTitle} depth={0} />}
                />

            }
        </>
    )
}

const ObjectListItem = ({ navigation, object, objectKey, depth }) => {

    const findNonImageProperties = (object) => {
        let firstProperty, firstValue, secondProperty, secondValue;
        let foundFirst = false;

        for (const [key, value] of Object.entries(object)) {
            if (!isImageUrl(value.toString())) {
                if (!foundFirst) {
                    firstProperty = key;
                    firstValue = value;
                    foundFirst = true;
                } else {
                    secondProperty = key;return { firstProperty, firstValue, secondProperty, secondValue };
                    secondValue = value;
                    break;
                }
            }
        }

        return { firstProperty, firstValue, secondProperty, secondValue };
    };

    const {firstProperty, firstValue, secondProperty, secondValue} = findNonImageProperties(object)

    return (
        <TouchableOpacity onPress={() => { navigation.push('RenderJsonObjectComponent', { data: object, depth: depth + 1, headerTitle: formatString(objectKey) }) }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{firstProperty !== undefined ? formatString(firstProperty) : ''} : </Text>
                <Text style={{ fontSize: 18 }}>{firstValue !== undefined ? formatString(firstValue.toString()) : ''}</Text>

            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBlockColor: '#ccc' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{secondProperty !== undefined ? formatString(secondProperty) : ''} : </Text>
                <Text style={{ fontSize: 18 }}>{secondValue !== undefined ? formatString(secondValue.toString()) : ''}</Text>
            </View>
        </TouchableOpacity>
    );
};