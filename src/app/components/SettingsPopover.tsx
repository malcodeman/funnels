import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Switch,
  useBoolean,
  useColorMode,
} from "@chakra-ui/react";
import { DownloadIcon, ImportIcon, SettingsIcon } from "lucide-react";
import { ImportJsonModal } from "./ImportJsonModal";
import { exportAsJson } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FunnelData } from "@/types";

type Props = {
  onImport: (funnel: FunnelData) => void;
};

export function SettingsPopover(props: Props) {
  const { onImport } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { getValues } = useFormContext<FunnelData>();
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button size="sm" leftIcon={<SettingsIcon size={16} />}>
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent width="222px">
          <PopoverBody>
            <FormControl
              mb="2"
              display={{ base: "none", lg: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel
                htmlFor="is-dark-mode"
                mb="0"
                cursor="pointer"
                marginInlineEnd="0"
                paddingInlineEnd="3"
                width="full"
              >
                Dark mode
              </FormLabel>
              <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                id="is-dark-mode"
              />
            </FormControl>
            <Divider marginY="2" />
            <Button
              size="sm"
              mb="2"
              justifyContent="flex-start"
              width="full"
              leftIcon={<ImportIcon size={16} />}
              onClick={setIsOpen.on}
            >
              Import JSON
            </Button>
            <Button
              size="sm"
              mb="2"
              justifyContent="flex-start"
              width="full"
              leftIcon={<DownloadIcon size={16} />}
              onClick={() => exportAsJson(getValues())}
            >
              Export JSON
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ImportJsonModal
        onImport={onImport}
        isOpen={isOpen}
        onClose={setIsOpen.off}
      />
    </>
  );
}
