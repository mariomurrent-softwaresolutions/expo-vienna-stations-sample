import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {ReactElement, useState, useCallback} from "react";
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {generateRandomNumberAboveTenThousand, isValidCoordinate} from "@/core/utils";
import {StationsTextFormControl} from "@/components/stations/controls/StationsTextFormControl";
import {useCustomViennaStationData} from "@/core/data/useCustomViennaStationData";
import {useToast, Toast, ToastTitle, ToastDescription} from '@/components/ui/toast';
import {useViennaStationsData} from "@/core";

export const AddStations = (): ReactElement => {
  const [isNameValid, setNameValid] = useState(true);
  const [isLongitudeValid, setIsLongitudeValid] = useState(true);
  const [isLatitudeValid, setIsLatitudeValid] = useState(true);
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const {save} = useCustomViennaStationData();
  const {refreshData} = useViennaStationsData();
  const toast = useToast();

  const showSuccessToast = useCallback(() => {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>
              The station was saved successfully.
            </ToastDescription>
          </Toast>
        );
      },
    });
  }, [toast]);

  const handleSubmit = useCallback(async () => {
    const nameValid = name.length > 2;
    const coordinatesValid = isValidCoordinate(latitude, longitude);
    if (nameValid && coordinatesValid) {
      try {
        await save({
          id: generateRandomNumberAboveTenThousand(),
          name,
          location: {latitude: Number(latitude), longitude: Number(longitude)}
        });
        showSuccessToast();
        refreshData();
      } catch (error) {
        console.error(error);
      }
    } else {
      setNameValid(nameValid);
      setIsLatitudeValid(coordinatesValid);
      setIsLongitudeValid(coordinatesValid);
    }
  }, [name, latitude, longitude, save, showSuccessToast, refreshData]);

  return (
    <Box className="p-3">
      <Heading size="2xl">Add a new station</Heading>
      <VStack className="pt-4">
        <StationsTextFormControl label="Name"
                                 placeholder="Name"
                                 errorText="At least 2 characters are required."
                                 helperText=" Must be at least 2 characters."
                                 isInvalid={!isNameValid}
                                 onChange={setName}
                                 value={name}
        />
        <StationsTextFormControl isInvalid={!isLatitudeValid} onChange={setLatitude} value={latitude} label="Latitude"
                                 errorText="Latitude must be a number" placeholder="Latitude"/>
        <StationsTextFormControl isInvalid={!isLongitudeValid} onChange={setLongitude} value={longitude}
                                 label="Longitude"
                                 errorText="Longitude must be a number" placeholder="Longitude"/>
        <Button
          className="w-fit self-end mt-4"
          size="sm"
          variant="outline"
          onPress={handleSubmit}
        >
          <ButtonText>Add Station</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};
