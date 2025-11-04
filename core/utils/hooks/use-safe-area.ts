import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useMemo} from "react";

export interface UseSafeArea {
  withSafeArea: (styles: any) => any;
}

export const useSafeArea = (): UseSafeArea => {
  const insets = useSafeAreaInsets();

  const withSafeArea = (styles: any) => {
    return {...styles, paddingTop: Math.max(insets.top, 16)};
  }

  return useMemo(() => ({
    withSafeArea
  }), []);
}
