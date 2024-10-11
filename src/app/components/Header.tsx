import { FunnelData } from "@/types";
import { Button, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { ImageIcon, TextIcon, WorkflowIcon } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { nanoid } from "nanoid";
import { SettingsPopover } from "./SettingsPopover";

type Props = {
  selectedPageIndex: number;
  onImport: (funnel: FunnelData) => void;
};

export function Header(props: Props) {
  const { selectedPageIndex, onImport } = props;
  const { control } = useFormContext<FunnelData>();
  const name = useWatch({ control, name: "name" });
  const { append } = useFieldArray({
    control,
    name: `pages.${selectedPageIndex}.blocks`,
  });
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  return (
    <Grid
      as="header"
      bgColor={backgroundColor}
      boxShadow={boxShadow}
      gridTemplateColumns="1fr 1fr 1fr"
      position="fixed"
      width="full"
      padding="2"
      zIndex="2"
    >
      <GridItem display="flex" gap="2" alignItems="center">
        <WorkflowIcon size={16} color="#0071ec" />
        {name}
      </GridItem>
      <GridItem display="flex" justifyContent="center" gap="2">
        <Button
          size="sm"
          leftIcon={<TextIcon size={16} />}
          onClick={() => {
            append({
              type: "text",
              text: "Text",
              color: "black",
              align: "left",
              id: nanoid(),
            });
          }}
        >
          Text
        </Button>
        <Button
          size="sm"
          leftIcon={<ImageIcon size={16} />}
          onClick={() => {
            append({
              type: "image",
              src: "",
              id: nanoid(),
            });
          }}
        >
          Image
        </Button>
      </GridItem>
      <GridItem display="flex" justifyContent="flex-end">
        <SettingsPopover onImport={onImport} />
      </GridItem>
    </Grid>
  );
}
