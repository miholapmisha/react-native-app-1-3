import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const CounterPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={[styles.container]}>
      {counter > 0 &&
        <Text>Button was clicked: {counter}</Text>}
      <Button
        onPress={() => {
          setCounter((prev) => prev + 1);
        }}
        title="CLICK ME"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'wheat',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});
