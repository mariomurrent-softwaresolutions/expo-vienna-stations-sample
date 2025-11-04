import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ReactElement, memo} from "react";

const LoadingIndicatorComponent = (): ReactElement => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  );
};

export const LoadingIndicator = memo(LoadingIndicatorComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  }
});
