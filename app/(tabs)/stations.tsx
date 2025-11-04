import {StyleSheet, View} from 'react-native';
import {ViennaStationsList} from "@/components/viennaStations/ViennaStationsList";
import {LoadingIndicator} from "@/components/loading/LoadingIndicator";
import {useViennaStationsData} from "@/core/data";
import {useSafeArea} from "@/core/utils";
import {useMemo} from "react";

export default function StationsScreen() {
  const {data, loading, refreshData} = useViennaStationsData();
  const {withSafeArea} = useSafeArea();

  const safeAreaStyles = useMemo(() => {
    return withSafeArea(styles);
  }, [withSafeArea]);

  if (loading) {
    return <LoadingIndicator/>;
  }

  return (
    <View style={safeAreaStyles}>
      <ViennaStationsList data={data} refresh={refreshData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
