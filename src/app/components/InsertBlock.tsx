import { FunnelData } from "@/types";
import {
  Button,
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import {
  ImageIcon,
  ListIcon,
  MoreHorizontalIcon,
  MousePointerClickIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SiLoom } from "@icons-pack/react-simple-icons";
import { useBlockStore, usePageIndexStore } from "@/state";

export function InsertBlock() {
  const { selectedPageIndex } = usePageIndexStore();
  const { setSelectedBlock } = useBlockStore();
  const { control } = useFormContext<FunnelData>();
  const { append } = useFieldArray({
    control,
    name: `pages.${selectedPageIndex}.blocks`,
  });

  function handleAddBlock(
    type: "text" | "image" | "list" | "button" | "video" | "loom"
  ) {
    if (type === "text") {
      const block = {
        type: "text" as const,
        text: "Text",
        color: "#000",
        align: "left" as const,
        size: "14",
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }

    if (type === "image") {
      const block = {
        type: "image" as const,
        src: "",
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }

    if (type === "list") {
      const block = {
        type: "list" as const,
        items: [
          {
            title: "Title",
            description: "Description",
            src: "",
            id: nanoid(),
          },
        ],
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }

    if (type === "button") {
      const block = {
        type: "button" as const,
        text: "Button",
        color: "#fff",
        bgColor: "#0071ec",
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }

    if (type === "video") {
      const block = {
        type: "video" as const,
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }

    if (type === "loom") {
      const block = {
        type: "loom" as const,
        src: "https://www.loom.com/share/2db6438e41b2456db774171a84b03566",
        id: nanoid(),
      };

      append(block);
      setSelectedBlock(block);
    }
  }

  return (
    <>
      <Button
        size="sm"
        leftIcon={<TextIcon size={16} />}
        onClick={() => handleAddBlock("text")}
      >
        Text
      </Button>
      <Button
        size="sm"
        leftIcon={<ImageIcon size={16} />}
        onClick={() => handleAddBlock("image")}
      >
        Image
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button size="sm" leftIcon={<MoreHorizontalIcon size={16} />}>
            More
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>Funnel elements</PopoverHeader>
          <PopoverBody>
            <Grid templateColumns="repeat(3, 1fr)" gridGap="4">
              <GridItem>
                <Button
                  size="sm"
                  leftIcon={<ListIcon size={16} />}
                  onClick={() => handleAddBlock("list")}
                >
                  List
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="sm"
                  leftIcon={<MousePointerClickIcon size={16} />}
                  onClick={() => handleAddBlock("button")}
                >
                  Button
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="sm"
                  leftIcon={<VideoIcon size={16} />}
                  onClick={() => handleAddBlock("video")}
                >
                  Video
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="sm"
                  leftIcon={<SiLoom size={16} />}
                  onClick={() => handleAddBlock("loom")}
                >
                  Loom
                </Button>
              </GridItem>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
