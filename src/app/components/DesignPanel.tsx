import { FunnelData } from "@/types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  funnel: FunnelData;
};

export function DesignPanel(props: Props) {
  const { funnel } = props;

  return (
    <>
      <FormControl>
        <FormLabel>Background color</FormLabel>
        <Input
          variant="filled"
          size="sm"
          borderRadius="md"
          value={funnel.bgColor}
          readOnly
        />
      </FormControl>
    </>
  );
}
