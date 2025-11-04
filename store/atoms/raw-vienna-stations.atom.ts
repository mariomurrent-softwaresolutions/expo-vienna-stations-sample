import {atomWithQuery} from "jotai-tanstack-query";
import {atom} from "jotai";

const URL = 'https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv';

const rawViennaStationsAtomQueryKeyAtom = atom(new Date().getUTCMilliseconds());

const rawViennaStationsAtom = atomWithQuery<string>((get) => ({
  queryKey: [get(rawViennaStationsAtomQueryKeyAtom)],
  queryFn: async ({queryKey: [, id]}) => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        return await response.text();
      }
      return "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }
}));

export {rawViennaStationsAtom, rawViennaStationsAtomQueryKeyAtom};
