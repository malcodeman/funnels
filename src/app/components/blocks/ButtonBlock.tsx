import { FunnelData, ButtonBlock as ButtonBlockType } from "@/types";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  pageIndex: number;
  blockIndex: number;
  block: ButtonBlockType;
};

export function ButtonBlock(props: Props) {
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
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(`pages.${pageIndex}.blocks.${blockIndex}.color`)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Background color</FormLabel>
        <Input
          key={block.id}
          variant="filled"
          size="sm"
          borderRadius="md"
          {...control.register(
            `pages.${pageIndex}.blocks.${blockIndex}.bgColor`
          )}
        />
      </FormControl>
    </Flex>
  );
}
