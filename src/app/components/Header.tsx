import { useState } from "react";
import { exportAsJson } from "@/lib/utils";
import { FunnelData } from "@/types";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  DownloadIcon,
  ImportIcon,
  WorkflowIcon,
} from "lucide-react";
import { ImportJsonModal } from "./ImportJsonModal";
import { useFormContext, useWatch } from "react-hook-form";

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
  onImport: (funnel: FunnelData) => void;
};

export function Header(props: Props) {
  const { onImport } = props;
  const { getValues, control } = useFormContext<FunnelData>();
  const name = useWatch({ control, name: "name" });

  return (
    <Flex
      as="header"
      position="fixed"
      justifyContent="space-between"
      width="full"
      bgColor="gray.800"
      padding="2"
      boxShadow="rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
      zIndex="2"
    >
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
      <Box />
    </Flex>
  );
}
