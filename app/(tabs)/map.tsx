import {StyleSheet, View} from 'react-native';
import {CustomMapView} from "@/components/map/CustomMapView";
import {useSafeArea} from "@/core/utils";
import { useMemo} from "react";
import { useLocalSearchParams} from "expo-router";

export default function MapScreen() {
  const {withSafeArea} = useSafeArea();
  const params = useLocalSearchParams<{ selectedStation: string }>();

  const safeAreaStyles = useMemo(() => {
    return withSafeArea(styles);
  }, [withSafeArea]);

  return (
    <View style={safeAreaStyles}>
      <CustomMapView zoomToStation={params.selectedStation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
});
