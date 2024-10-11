import { FunnelData, ListBlock as ListBlockType } from "@/types";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { map } from "remeda";

type Props = {
  pageIndex: number;
  blockIndex: number;
  block: ListBlockType;
};

export function ListBlock(props: Props) {
  const { pageIndex, blockIndex, block } = props;
  const { control } = useFormContext<FunnelData>();

  return (
    <Flex flexDirection="column" gap="4">
      {map(block.items, (item, index) => (
        <Fragment key={item.id}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              {...control.register(
                `pages.${pageIndex}.blocks.${blockIndex}.items.${index}.title`
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              {...control.register(
                `pages.${pageIndex}.blocks.${blockIndex}.items.${index}.description`
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Icon</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              {...control.register(
                `pages.${pageIndex}.blocks.${blockIndex}.items.${index}.src`
              )}
            />
          </FormControl>
        </Fragment>
      ))}
    </Flex>
  );
}
