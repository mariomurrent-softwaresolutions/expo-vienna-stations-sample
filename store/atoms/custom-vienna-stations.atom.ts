import {atom} from "jotai";
import {ViennaStation} from "@/models";


const customViennaStationsAtom = atom<ViennaStation[]>([]);

export {customViennaStationsAtom};
