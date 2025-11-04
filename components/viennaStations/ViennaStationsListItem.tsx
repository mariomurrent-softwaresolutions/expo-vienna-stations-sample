import {ViennaStation} from "@/models";
import {Card} from "@/components/ui/card";
import {Box} from "@/components/ui/box";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {TouchableOpacity} from "react-native";
import {ReactElement} from "react";

export interface ViennaStationsListItemProps  {
  station: ViennaStation;
  onPress: () => void;
}

export const ViennaStationsListItem = (props: ViennaStationsListItemProps): ReactElement => {

  const {station, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
    <Card size="md" variant="elevated" className="m-3">
      <Box className="flex-row">
        <Avatar className="mr-3">
          <AvatarImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTby4ZhtdSea6bw1Qsxf7Fp-U06wABEPiTrgQ&s',
            }}
            alt="image"
          />
        </Avatar>
        <Box>
          <Heading size="md" className="mb-1">
            {station.name}
          </Heading>
          <Text size="sm">{station.location.latitude}, {station.location.longitude}</Text>
        </Box>
      </Box>
    </Card>
    </TouchableOpacity>
  );

};
