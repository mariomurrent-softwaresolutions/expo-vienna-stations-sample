import {StyleSheet, View} from "react-native";
import {ReactElement} from "react";
import {MapControlButton} from "@/components/map/MapControlButton";

export interface MapControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomToMe: () => void;
}

export const MapControls = (props: MapControlProps): ReactElement => {

  const {zoomIn, zoomOut, zoomToMe} = props;

  return (
    <>
      <View style={styles.controls}>
        <MapControlButton onPress={zoomIn} text="+" styles={styles}/>
        <MapControlButton onPress={zoomOut} text="-" styles={styles}/>
        <MapControlButton onPress={zoomToMe} text="📍" styles={{button: styles.myLocation}}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  myLocation: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 0
  },
});
