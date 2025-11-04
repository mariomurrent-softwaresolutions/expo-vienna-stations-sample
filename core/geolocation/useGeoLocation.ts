import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {GeoLocation} from "@/models";
import {LocationAccuracy, LocationSubscription} from "expo-location";

export default function useGeolocation() {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let subscription: LocationSubscription | null = null;
    const getLocation = async () => {
      await requestLocationPermission();
      return Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.Balanced,
          timeInterval: 5000
        },
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => setError(err),
      );
    };

    getLocation().then(sub => subscription = sub).catch(console.error);

    return () => {
      subscription?.remove()
    }
  }, []);

  return {location, error};
}
