import { FunnelData, TextBlock as TextBlockType } from "@/types";
import {
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  pageIndex: number;
  blockIndex: number;
  block: TextBlockType;
};

export function TextBlock(props: Props) {
  const { pageIndex, blockIndex, block } = props;
  const { control, setValue } = useFormContext<FunnelData>();
  const blocks = useWatch({
    control,
    name: `pages.${pageIndex}.blocks`,
  });
  const align =
    blocks[blockIndex].type === "text" ? blocks[blockIndex].align : "left";

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
        <FormLabel>Size</FormLabel>
        <InputGroup size="sm">
          <Input
            key={block.id}
            variant="filled"
            size="sm"
            borderRadius="md"
            {...control.register(
              `pages.${pageIndex}.blocks.${blockIndex}.size`
            )}
          />
          <InputRightAddon>px</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Align</FormLabel>
        <ButtonGroup size="sm" isAttached>
          <IconButton
            aria-label="Left"
            icon={<AlignLeftIcon size={16} />}
            isActive={align === "left"}
            onClick={() =>
              setValue(`pages.${pageIndex}.blocks.${blockIndex}.align`, "left")
            }
          />
          <IconButton
            aria-label="Center"
            icon={<AlignCenterIcon size={16} />}
            isActive={align === "center"}
            onClick={() =>
              setValue(
                `pages.${pageIndex}.blocks.${blockIndex}.align`,
                "center"
              )
            }
          />
          <IconButton
            aria-label="Right"
            icon={<AlignRightIcon size={16} />}
            isActive={align === "right"}
            onClick={() =>
              setValue(`pages.${pageIndex}.blocks.${blockIndex}.align`, "right")
            }
          />
          <IconButton
            aria-label="Justify"
            icon={<AlignJustifyIcon size={16} />}
            isActive={align === "justify"}
            onClick={() =>
              setValue(
                `pages.${pageIndex}.blocks.${blockIndex}.align`,
                "justify"
              )
            }
          />
        </ButtonGroup>
      </FormControl>
    </Flex>
  );
}
