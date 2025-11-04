import {useSafeArea} from "@/core/utils";
import {StyleSheet, View} from 'react-native';
import {useMemo} from "react";
import {AddStations} from "@/components/stations/AddStations";

export default function HomeScreen() {
  const {withSafeArea} = useSafeArea();

  const safeAreaStyles = useMemo(() => {
    return withSafeArea(styles);
  }, [withSafeArea]);

  return (
    <View style={safeAreaStyles}>
      <AddStations/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
