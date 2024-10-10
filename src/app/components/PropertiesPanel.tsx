import { HEADER_HEIGHT } from "@/lib/constants";
import { Block } from "@/types";
import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Fragment } from "react";
import { map } from "remeda";

type Props = {
  selectedBlock: null | Block;
};

export function PropertiesPanel(props: Props) {
  const { selectedBlock } = props;

  function renderBlock(block: null | Block) {
    if (!block) {
      return null;
    }

    if (block.type === "text") {
      return (
        <Flex flexDirection="column" gap="4">
          <FormControl>
            <FormLabel>Text</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.text}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Color</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.color}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Align</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.align}
              readOnly
            />
          </FormControl>
        </Flex>
      );
    }

    if (block.type === "image") {
      return (
        <Flex flexDirection="column" gap="4">
          <FormControl>
            <FormLabel>Source</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.src}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Alt</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.alt}
              readOnly
            />
          </FormControl>
        </Flex>
      );
    }

    if (block.type === "list") {
      return (
        <Flex flexDirection="column" gap="4">
          {map(block.items, (item) => (
            <Fragment key={item.id}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  variant="filled"
                  size="sm"
                  borderRadius="md"
                  value={item.title}
                  readOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  variant="filled"
                  size="sm"
                  borderRadius="md"
                  value={item.description}
                  readOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Icon</FormLabel>
                <Input
                  variant="filled"
                  size="sm"
                  borderRadius="md"
                  value={item.src}
                  readOnly
                />
              </FormControl>
            </Fragment>
          ))}
        </Flex>
      );
    }

    if (block.type === "button") {
      return (
        <Flex flexDirection="column" gap="4">
          <FormControl>
            <FormLabel>Text</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.text}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Color</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.color}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Background color</FormLabel>
            <Input
              variant="filled"
              size="sm"
              borderRadius="md"
              value={block.bgColor}
              readOnly
            />
          </FormControl>
        </Flex>
      );
    }
  }

  return (
    <Box
      position="fixed"
      right="0"
      top={HEADER_HEIGHT}
      bottom="0"
      width="260px"
      height={`calc(100vh - ${HEADER_HEIGHT})`}
      bgColor="gray.800"
      pt="2"
      px="4"
      pb="5"
      overflowY="auto"
    >
      {renderBlock(selectedBlock)}
    </Box>
  );
}
