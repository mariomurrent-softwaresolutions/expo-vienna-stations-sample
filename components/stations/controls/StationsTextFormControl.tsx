import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {AlertCircleIcon} from '@/components/ui/icon';
import {Input, InputField} from '@/components/ui/input';
import {ReactElement, memo, useCallback} from 'react';

export interface StationsFormControlProps {
  isInvalid: boolean;
  onChange: (value: string) => void;
  value: string;
  label: string;
  helperText?: string;
  errorText: string;
  placeholder: string;
}

const StationsTextFormControlComponent = (props: StationsFormControlProps): ReactElement => {

  const {isInvalid, onChange, value, label, helperText, errorText, placeholder} = props;

  const handleChange = useCallback((text: string) => {
    onChange(text);
  }, [onChange]);

  return (
    <FormControl
      isInvalid={isInvalid}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className="my-1" size="md">
        <InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
        />
      </Input>
      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500"/>
        <FormControlErrorText className="text-red-500">
          {errorText}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export const StationsTextFormControl = memo(StationsTextFormControlComponent);
