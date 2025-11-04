import {StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {ReactElement, memo} from "react";

export interface MapControlButtonProps {
  onPress: () => void;
  text: string;
  styles: {
    button: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

const MapControlButtonComponent = (props: MapControlButtonProps): ReactElement => {

  const {onPress, text, styles} = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles?.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const MapControlButton = memo(MapControlButtonComponent);
