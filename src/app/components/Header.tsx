import { useState } from "react";
import { exportAsJson } from "@/lib/utils";
import { FunnelData } from "@/types";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  DownloadIcon,
  ImageIcon,
  ImportIcon,
  TextIcon,
  WorkflowIcon,
} from "lucide-react";
import { ImportJsonModal } from "./ImportJsonModal";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { nanoid } from "nanoid";

function ImportJsonMenuItem(props: { onImport: (funnel: FunnelData) => void }) {
  const { onImport } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuItem icon={<ImportIcon size={16} />} onClick={() => setIsOpen(true)}>
        Import JSON
      </MenuItem>
      <ImportJsonModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onImport={onImport}
      />
    </>
  );
}

type Props = {
  selectedPageIndex: number;
  onImport: (funnel: FunnelData) => void;
};

export function Header(props: Props) {
  const { selectedPageIndex, onImport } = props;
  const { getValues, control } = useFormContext<FunnelData>();
  const name = useWatch({ control, name: "name" });
  const { append } = useFieldArray({
    control,
    name: `pages.${selectedPageIndex}.blocks`,
  });

  return (
    <Grid
      as="header"
      gridTemplateColumns="1fr 1fr 1fr"
      position="fixed"
      width="full"
      bgColor="gray.800"
      padding="2"
      boxShadow="rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
      zIndex="2"
    >
      <GridItem>
        <Flex gap="2" alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon size={16} />}
              size="sm"
              leftIcon={<WorkflowIcon size={16} color="#0071ec" />}
            >
              Funnels
            </MenuButton>
            <MenuList>
              <ImportJsonMenuItem onImport={onImport} />
              <MenuItem
                icon={<DownloadIcon size={16} />}
                onClick={() => exportAsJson(getValues())}
              >
                Export JSON
              </MenuItem>
            </MenuList>
          </Menu>
          <Text>{name}</Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex gap="2" justifyContent="center">
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
        </Flex>
      </GridItem>
      <GridItem />
    </Grid>
  );
}
