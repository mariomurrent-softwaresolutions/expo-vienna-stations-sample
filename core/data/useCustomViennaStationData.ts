import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {ViennaStation} from "@/models";
import {useCallback, useMemo} from "react";
import {useAtom} from "jotai";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";

export interface CustomViennaStationData {
  save: (station: ViennaStation) => Promise<void>;
  value: ViennaStation[] | null;
}

export const useCustomViennaStationData = (): CustomViennaStationData => {
  const {setValue} = useSecureStorage<ViennaStation[]>("custom_stations");
  const [customStations, setCustomStations] = useAtom(customViennaStationsAtom);

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
    value: customStations,
  }), [save, customStations]);
}
