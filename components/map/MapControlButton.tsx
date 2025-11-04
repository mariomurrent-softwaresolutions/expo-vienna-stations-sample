import {StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {ReactElement} from "react";

export interface MapControlButtonProps {
  onPress: () => void;
  text: string;
  styles: {
    button: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

export const MapControlButton = (props: MapControlButtonProps): ReactElement => {

  const {onPress, text, styles} = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles?.text}>{text}</Text>
    </TouchableOpacity>
  );
};
