import {useEffect, useMemo} from "react";
import {ViennaStation} from "@/models/ViennaStation";
import {useViennaStationsData} from "@/core/data/useViennaStationsData";
import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";
import {useAtom} from "jotai";

export interface AppInitializer {
  loading: boolean;
  data: ViennaStation[];
}

export const useAppInitializer = (): AppInitializer => {
  const {data, loading} = useViennaStationsData();
  const {value, loading: customStationsLoading} = useSecureStorage<ViennaStation[]>("custom_stations");
  const [,setCustomStations] = useAtom(customViennaStationsAtom);

  useEffect(() => {
    if(!customStationsLoading && value){
      setCustomStations(value);
    }
  }, [value, customStationsLoading, setCustomStations]);

  const isLoading = useMemo(() => {
    return loading || customStationsLoading;
  }, [loading, customStationsLoading]);

  return useMemo(() => ({
    loading: isLoading,
    data: data
  }), [data, isLoading])
}
