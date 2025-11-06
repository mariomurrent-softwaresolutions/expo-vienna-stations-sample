import {useSecureStorage} from "@/core/storage/useSecureStorage";
import {ViennaStation} from "@/models";
import {useCallback, useEffect, useMemo} from "react";
import {useAtom} from "jotai";
import {savedViennaStationsAtom} from "@/store/atoms/saved-vienna-stations.atom";
import {viennaStationsAtom} from "@/store/atoms";

export interface SavedViennaStationData {
  save: (stations: ViennaStation[]) => Promise<void>;
  value: ViennaStation[] | null;
  loading: boolean;
}

export const useSavedViennaStationData = (): SavedViennaStationData => {
  const {setValue, value, loading} = useSecureStorage<ViennaStation[]>("vienna_stations");
  const [savedStations, setSavedStations] = useAtom(savedViennaStationsAtom);
  const [stations] = useAtom(viennaStationsAtom);

  useEffect(() => {
    if (!stations.isLoading) {
      save(stations.data).catch(console.error);
    }
  }, [stations.isLoading, stations.data]);

  useEffect(() => {
    if (value) {
      setSavedStations(value);
    }
  }, [loading]);

  const save = useCallback(async (stations: ViennaStation[]): Promise<void> => {
    try {
      await setValue(stations);
      setSavedStations(stations);
      return await Promise.resolve();
    } catch {
      return await Promise.reject();
    }

  }, [savedStations, setValue, setSavedStations]);

  const isLoading = useMemo(() => {
    return stations.isLoading || loading
      ;
  }, []);

  return useMemo(() => ({
    save,
    loading: isLoading,
    value: savedStations,
  }), [save, savedStations]);
}
