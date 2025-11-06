import {useMemo} from "react";
import {ViennaStation} from "@/models/ViennaStation";
import {useViennaStationsData} from "@/core/data/useViennaStationsData";
import {useSavedViennaStationData} from "@/core/data/useSavedViennaStationData";
import {useCustomViennaStationData} from "@/core/data/useCustomViennaStationData";

export interface AppInitializer {
  loading: boolean;
  data: ViennaStation[];
}

export const useAppInitializer = (): AppInitializer => {
  const {data, loading} = useViennaStationsData();
  const {loading: customStationsLoading} = useCustomViennaStationData();
  const {loading: savedStationsLoading} = useSavedViennaStationData();


  const isLoading = useMemo(() => {
    return loading || customStationsLoading || savedStationsLoading;
  }, [loading, customStationsLoading, savedStationsLoading]);

  return useMemo(() => ({
    loading: isLoading,
    data: data
  }), [data, isLoading])
}
