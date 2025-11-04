import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {FlatList, ListRenderItemInfo, RefreshControl} from "react-native";
import {ViennaStation} from "@/models";
import {ViennaStationsListItem} from "@/components/viennaStations/ViennaStationsListItem";
import {router} from "expo-router";

export interface ViennaStationListProps {
  data: ViennaStation[];
  refresh: () => void;
}

export const ViennaStationsList = (props: ViennaStationListProps): ReactElement => {
  const {data, refresh} = props;
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    setIsRefreshing(false);
  }, [data]);

  const onPress = useCallback((station: ViennaStation) => {
    router.setParams({selectedStation: station.id});
    router.push(`/(tabs)/map?selectedStation=${station.id}`);
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refresh();
  }, [refresh]);

  const sortedData = useMemo(() => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const renderItem = useCallback((data: ListRenderItemInfo<ViennaStation>) => {
    const {item} = data;
    return <ViennaStationsListItem station={item} onPress={() => onPress(item)}/>
  }, [onPress]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};
