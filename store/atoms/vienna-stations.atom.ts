import {atom} from "jotai";
import Papa from 'papaparse';
import {rawViennaStationsAtom} from "@/store/atoms/raw-vienna-stations.atom";
import {useViennaStationsMapper} from "@/core/mapper";

const viennaStationsAtom = atom((get) => {
  const query = get(rawViennaStationsAtom);
  const {map} = useViennaStationsMapper();

  if (query.data) {
    const csv = Papa.parse(query.data);
    return {
      isLoading: false,
      data: map(csv.data)
    }
  }
  return {
    isLoading: query.data !== undefined && query.data !== null,
    data: []
  };
});

export {viennaStationsAtom};
