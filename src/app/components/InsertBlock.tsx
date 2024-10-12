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
} from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  selectedPageIndex: number;
};

export function InsertBlock(props: Props) {
  const { selectedPageIndex } = props;
  const { control } = useFormContext<FunnelData>();
  const { append } = useFieldArray({
    control,
    name: `pages.${selectedPageIndex}.blocks`,
  });

  function handleAddBlock(type: "text" | "image" | "list" | "button") {
    if (type === "text") {
      append({
        type: "text",
        text: "Text",
        color: "#000",
        align: "left",
        size: "14",
        id: nanoid(),
      });
    }

    if (type === "image") {
      append({
        type: "image",
        src: "",
        id: nanoid(),
      });
    }

    if (type === "list") {
      append({
        type: "list",
        items: [
          {
            title: "Title",
            description: "Description",
            src: "",
            id: nanoid(),
          },
        ],
        id: nanoid(),
      });
    }

    if (type === "button") {
      append({
        type: "button",
        text: "Button",
        color: "#fff",
        bgColor: "#0071ec",
        id: nanoid(),
      });
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
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
