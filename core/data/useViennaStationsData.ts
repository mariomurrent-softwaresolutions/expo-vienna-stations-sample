import {useAtom} from "jotai";
import {useMemo} from "react";
import {ViennaStation} from "@/models/ViennaStation";
import {rawViennaStationsAtomQueryKeyAtom, viennaStationsAtom} from "@/store/atoms";
import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";

export interface ViennaStationsData {
  loading: boolean;
  data: ViennaStation[];
  refreshData: () => void;
}

export const useViennaStationsData = (): ViennaStationsData => {
  const [customStations,] = useAtom(customViennaStationsAtom);
  const {
    value: viennaStations,
    loading: viennaStationsLoading,
  } = useSecureStorage<ViennaStation[]>("vienna_stations");

  const [stations] = useAtom(viennaStationsAtom);
  const [, setViennaStationsQueryKey] = useAtom(rawViennaStationsAtomQueryKeyAtom);

  const refreshData = (): void => {
    setViennaStationsQueryKey(new Date().getUTCMilliseconds());
  };

  const isLoading = useMemo(() => {
    return stations.isLoading || viennaStationsLoading;
  }, [stations.isLoading, viennaStationsLoading]);


  const allData = useMemo(() => {
    const allStations: ViennaStation[] = [];
    if (viennaStations && viennaStations.length > 0) {
      allStations.push(...viennaStations);
    } else {
      allStations.push(...stations.data);
    }
    if (customStations) {
      allStations.push(...customStations);
    }
    return allStations;
  }, [stations, viennaStations, customStations]);

  return useMemo(() => ({
    loading: isLoading,
    data: allData,
    refreshData
  }), [stations, isLoading, refreshData, allData]);
}
