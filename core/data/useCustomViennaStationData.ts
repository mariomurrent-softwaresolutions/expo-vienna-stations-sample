import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {ViennaStation} from "@/models";
import {useCallback, useMemo} from "react";
import {useAtom} from "jotai";
import {customViennaStationsAtom} from "@/store/atoms/custom-vienna-stations.atom";

export interface CustomViennaStationData {
  save: (station: ViennaStation) => Promise<void>;
  value: Array<ViennaStation> | null;
}

export const useCustomViennaStationData = (): CustomViennaStationData => {
  const {setValue} = useSecureStorage<Array<ViennaStation>>("custom_stations");
  const [customStations, setCustomStations] = useAtom(customViennaStationsAtom);

  const save = useCallback(async (station: ViennaStation): Promise<void> => {
    let newStations = new Array<ViennaStation>();
    if (customStations) {
      newStations = newStations.concat(customStations);
    }
    newStations.push(station);
    try {
      await setValue(newStations);
      setCustomStations(newStations);
      return await Promise.resolve();
    } catch {
      return await Promise.reject();
    }

  }, [customStations, setValue]);

  return useMemo(() => ({
    save,
    value: customStations,
  }), [save]);
}
