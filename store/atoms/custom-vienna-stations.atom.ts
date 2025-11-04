import {atom} from "jotai";
import {ViennaStation} from "@/models";


const customViennaStationsAtom = atom<Array<ViennaStation>>([]);

export {customViennaStationsAtom};
