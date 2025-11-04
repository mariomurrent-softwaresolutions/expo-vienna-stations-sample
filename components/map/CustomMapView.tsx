import {ReactElement, useCallback, useEffect, useMemo, useRef} from "react";
import useGeolocation from "@/core/geolocation/useGeoLocation";
import MapView, {Camera, Marker} from "react-native-maps";
import {isAndroid, isIOS} from "@/core/utils";
import {StyleSheet} from "react-native";
import {MapControls} from "@/components/map/MapControls";
import {useViennaStationsData} from "@/core/data";
import {LoadingIndicator} from "@/components/loading/LoadingIndicator";
import {ViennaStation} from "@/models";

export interface CustomMapViewProps {
  zoomToStation: number;
}

export const CustomMapView = (props: CustomMapViewProps): ReactElement => {
  const {zoomToStation} = props;

  const defaultAltitude = 100;
  const defaultZoom = 17;
  const mapRef = useRef<MapView>(null);
  const {location} = useGeolocation();
  const {data, loading} = useViennaStationsData();

  const defaultLocation = useMemo(() => ({
    latitude: 48.1944869,
    longitude: 16.2706927,
  }), []);

  const zoomToStationData = useMemo(() => {
    return data?.find((s) => s.id === zoomToStation);
  }, [data, zoomToStation]);

  const zoomToDefaultOrGivenLocation = useCallback(() => {
    const zoomToLocation = zoomToStationData?.location ?? location;
    if (zoomToLocation) {
      mapRef.current?.animateCamera({
        center: {
          latitude: zoomToLocation.latitude,
          longitude: zoomToLocation.longitude,
        },
        zoom: defaultZoom,
        altitude: defaultAltitude
      });
    }
  }, [location, zoomToStationData?.location, defaultZoom, defaultAltitude]);

  useEffect(() => {
    zoomToDefaultOrGivenLocation();
  }, [zoomToStation, zoomToDefaultOrGivenLocation]);

  const mapCenter = useMemo(() => {
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }
    return defaultLocation;
  }, [location, defaultLocation]);

  const zoomToMe = () => {
    if (location) {
      mapRef.current?.animateCamera({
        center: mapCenter,
        zoom: defaultZoom,
        altitude: defaultAltitude
      });
    }
  };

  const zoomIn = () => {
    mapRef?.current?.getCamera().then((cam: Camera) => {
      if (isAndroid() && cam.zoom) {
        cam.zoom += 1;
      } else if (isIOS() && cam.altitude) {
        cam.altitude /= 2;
      }
      mapRef?.current?.animateCamera(cam);
    });
  };

  const zoomOut = () => {
    mapRef?.current?.getCamera().then((cam: Camera) => {
      if (isAndroid() && cam.zoom) {
        cam.zoom -= 1;
      } else if (isIOS() && cam.altitude) {
        cam.altitude *= 2;
      }
      mapRef?.current?.animateCamera(cam);
    });
  };

  if (loading) {
    return <LoadingIndicator/>;
  }

  return (
    <>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        showsUserLocation 
        followsUserLocation
        zoomControlEnabled 
        zoomEnabled
      >
        {location && <Marker coordinate={location}/>}
        {data.map((station: ViennaStation) => (
          <Marker key={station.id} coordinate={station.location}/>
        ))}
      </MapView>
      <MapControls zoomIn={zoomIn} zoomOut={zoomOut} zoomToMe={zoomToMe}/>
    </>
  );
};


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
});
