import {atom} from "jotai";
import Papa from 'papaparse';
import {rawViennaStationsAtom} from "@/store/atoms/raw-vienna-stations.atom";
import {mapViennaStations} from "@/core/mapper";

const viennaStationsAtom = atom((get) => {
  const query = get(rawViennaStationsAtom);

  if (query.data) {
    const csv = Papa.parse(query.data);
    return {
      isLoading: false,
      data: mapViennaStations(csv.data)
    };
  }
  return {
    isLoading: query.data !== undefined && query.data !== null,
    data: []
  };
});

export {viennaStationsAtom};
