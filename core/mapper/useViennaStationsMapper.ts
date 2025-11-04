import {ViennaStation, GeoLocation} from "@/models";
import {isValidCoordinate} from "@/core/utils";

export interface ViennaStationsMapper {
  map(data: Array<any>): Array<ViennaStation>;
}

export const useViennaStationsMapper = (): ViennaStationsMapper => {

  const map = (data: Array<any>): Array<ViennaStation> => {
    return data.filter(isCoordinateValid).filter(isNameValid).map(entry => {
      const newStation: ViennaStation = {
        name: getValueOrDefault(entry?.[2], ''),
        id: getValueOrDefault(entry?.[0], Math.random()),
        location: mapGeoLocation(getValueOrDefault(entry?.[6], ''), getValueOrDefault(entry?.[5], ''))
      };
      return newStation;
    });
  }

  const mapGeoLocation = (latitude: string, longitude: string): GeoLocation => {
    return {
      latitude: Number(latitude),
      longitude: Number(longitude)
    }
  }

  const getValueOrDefault = <T>(entry: string, defaultValue: T): any => {
    return entry ?? defaultValue;
  }

  const isCoordinateValid = (entry: any): boolean => {
    return isValidCoordinate(getValueOrDefault(entry?.[6], ''), getValueOrDefault(entry?.[5], ''));
  }

  const isNameValid = (entry: any): boolean => {
    return entry?.[2].length > 0;
  }

  return {
    map
  }
}
