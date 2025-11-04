import {useEffect, useMemo} from "react";
import {ViennaStation} from "@/models/ViennaStation";
import {useViennaStationsData} from "@/core/data/useViennaStationsData";
import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";
import {useAtom} from "jotai";

export interface AppInitializer {
  loading: boolean;
  data: Array<ViennaStation>;
}

export const useAppInitializer = (): AppInitializer => {
  const {data, loading} = useViennaStationsData();
  const {value, loading: customStationsLoading} = useSecureStorage<Array<ViennaStation>>("custom_stations");
  const [,setCustomStations] = useAtom(customViennaStationsAtom);

  useEffect(() => {
    if(!customStationsLoading && value){
      setCustomStations(value);
    }
  }, [value, customStationsLoading]);

  const isLoading = useMemo(() => {
    return loading || customStationsLoading;
  }, [loading, customStationsLoading]);

  return useMemo(() => ({
    loading: isLoading,
    data: data
  }), [data, loading])
}
