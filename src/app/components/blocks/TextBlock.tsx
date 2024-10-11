import { FunnelData, TextBlock as TextBlockType } from "@/types";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  pageIndex: number;
  blockIndex: number;
  block: TextBlockType;
};

export function TextBlock(props: Props) {
  const { pageIndex, blockIndex, block } = props;
  const { control } = useFormContext<FunnelData>();

  return (
    <Flex flexDirection="column" gap="4">
      <FormControl>
        <FormLabel>Text</FormLabel>
        <Input
          key={block.id}
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(`pages.${pageIndex}.blocks.${blockIndex}.text`)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Input
          key={block.id}
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(`pages.${pageIndex}.blocks.${blockIndex}.color`)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Align</FormLabel>
        <Input
          key={block.id}
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(`pages.${pageIndex}.blocks.${blockIndex}.align`)}
        />
      </FormControl>
    </Flex>
  );
}
