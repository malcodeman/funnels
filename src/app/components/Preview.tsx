import { useLocalStorage } from "@/hooks/useLocalStorageValue";
import { Block, FunnelData } from "@/types";
import {
  Button,
  Container,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { isEmpty, isNullish, map } from "remeda";

type Props = {
  selectedPageIndex: number;
  selectedBlockId: string | undefined;
  onSelectBlock: (block: null | Block) => void;
};

export function Preview(props: Props) {
  const { selectedPageIndex, selectedBlockId, onSelectBlock } = props;
  const { control } = useFormContext<FunnelData>();
  const page = useWatch({ control, name: "pages" })[selectedPageIndex];
  const branding = useWatch({ control, name: "branding" });
  const funnelBgColor = useWatch({ control, name: "bgColor" });
  const backgroundColor = useColorModeValue("#f5f5f5", "#191f2a");
  const isSmartphoneView = useLocalStorage("is-smartphone-view", {
    defaultValue: true,
  });

  if (!page) {
    return null;
  }

  function renderBlock(block: Block) {
    if (block.type === "text") {
      return (
        <Text
          style={{
            color: block.color,
            textAlign: block.align,
            fontSize: isEmpty(block.size) ? "14px" : `${block.size}px`,
          }}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {block.text}
        </Text>
      );
    }

    if (block.type === "image") {
      return (
        <Image
          src={block.src}
          alt={block.alt}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        />
      );
    }

    if (block.type === "list") {
      return (
        <List
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {map(block.items, (item) => (
            <ListItem key={item.id} display="flex" alignItems="center">
              <ListIcon as={Image} src={item.src} />
              <Text>{item.title}</Text>
              <Text opacity="0.8">{item.description}</Text>
            </ListItem>
          ))}
        </List>
      );
    }

    if (block.type === "button") {
      return (
        <Button
          style={{ color: block.color, backgroundColor: block.bgColor }}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {block.text}
        </Button>
      );
    }
  }

  return (
    <Flex bgColor={backgroundColor} height="100vh" pt="50px">
      <Container
        maxWidth={
          isSmartphoneView.value || isNullish(isSmartphoneView.value)
            ? "480px"
            : "1280px"
        }
      >
        <Flex
          flexDir="column"
          height="full"
          gap="4"
          padding="2"
          overflowY="auto"
          style={{ backgroundColor: funnelBgColor }}
          transition="background-color 200ms linear"
        >
          {map(page.blocks, (block) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
          {branding ? (
            <Text fontSize="sm" textAlign="center" data-testid="branding-text">
              Powered by{" "}
              <Text as="span" fontWeight="bold">
                Funnels
              </Text>
            </Text>
          ) : null}
        </Flex>
      </Container>
    </Flex>
  );
}
