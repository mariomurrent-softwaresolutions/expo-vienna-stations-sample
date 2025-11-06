import {atom} from "jotai";
import {ViennaStation} from "@/models";


const savedViennaStationsAtom = atom<ViennaStation[]>([]);

export {savedViennaStationsAtom};
