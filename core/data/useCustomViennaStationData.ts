import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {ViennaStation} from "@/models";
import {useCallback, useEffect, useMemo} from "react";
import {useAtom} from "jotai";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";

export interface CustomViennaStationData {
  save: (station: ViennaStation) => Promise<void>;
  value: ViennaStation[] | null;
  loading: boolean;
}

export const useCustomViennaStationData = (): CustomViennaStationData => {
  const {setValue, value, loading} = useSecureStorage<ViennaStation[]>("custom_stations");
  const [customStations, setCustomStations] = useAtom(customViennaStationsAtom);

  useEffect(() => {
    if(value){
      setCustomStations(value);
    }
  }, [loading]);

  const save = useCallback(async (station: ViennaStation): Promise<void> => {
    const newStations: ViennaStation[] = customStations ? [...customStations, station] : [station];
    try {
      await setValue(newStations);
      setCustomStations(newStations);
      return await Promise.resolve();
    } catch {
      return await Promise.reject();
    }

  }, [customStations, setValue, setCustomStations]);

  return useMemo(() => ({
    save,
    loading,
    value: customStations,
  }), [save, customStations]);
}
