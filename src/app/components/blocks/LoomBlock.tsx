import { FunnelData, LoomBlock as LoomBlockType } from "@/types";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  pageIndex: number;
  blockIndex: number;
  block: LoomBlockType;
};

export function LoomBlock(props: Props) {
  const { pageIndex, blockIndex, block } = props;
  const { control } = useFormContext<FunnelData>();

  return (
    <Flex flexDirection="column" gap="4">
      <FormControl>
        <FormLabel>Source</FormLabel>
        <Input
          key={block.id}
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(`pages.${pageIndex}.blocks.${blockIndex}.src`)}
        />
      </FormControl>
    </Flex>
  );
}
