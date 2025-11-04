import {ViennaStation, GeoLocation} from "@/models";
import {isValidCoordinate} from "@/core/utils";

export interface ViennaStationsMapper {
  map(data: any[]): ViennaStation[];
}

// CSV column indices
const CSV_COLUMN_ID = 0;
const CSV_COLUMN_NAME = 2;
const CSV_COLUMN_LONGITUDE = 5;
const CSV_COLUMN_LATITUDE = 6;

const getValueOrDefault = <T>(entry: string, defaultValue: T): any => {
  return entry ?? defaultValue;
};

const mapGeoLocation = (latitude: string, longitude: string): GeoLocation => {
  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
};

const isCoordinateValid = (entry: any): boolean => {
  return isValidCoordinate(
    getValueOrDefault(entry?.[CSV_COLUMN_LATITUDE], ''), 
    getValueOrDefault(entry?.[CSV_COLUMN_LONGITUDE], '')
  );
};

const isNameValid = (entry: any): boolean => {
  return entry?.[CSV_COLUMN_NAME]?.length > 0;
};

export const mapViennaStations = (data: any[]): ViennaStation[] => {
  return data.filter(isCoordinateValid).filter(isNameValid).map(entry => {
    const newStation: ViennaStation = {
      name: getValueOrDefault(entry?.[CSV_COLUMN_NAME], ''),
      id: getValueOrDefault(entry?.[CSV_COLUMN_ID], Math.random()),
      location: mapGeoLocation(
        getValueOrDefault(entry?.[CSV_COLUMN_LATITUDE], ''), 
        getValueOrDefault(entry?.[CSV_COLUMN_LONGITUDE], '')
      )
    };
    return newStation;
  });
};

export const useViennaStationsMapper = (): ViennaStationsMapper => {
  return {
    map: mapViennaStations
  };
};
