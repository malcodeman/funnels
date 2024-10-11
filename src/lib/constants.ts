import { FunnelData } from "@/types";
import { z } from "zod";
import { nanoid } from "nanoid";

export const FUNNEL_DATA: FunnelData = {
  name: "My awesome funnel",
  bgColor: "#F5F5F5",
  pages: [
    {
      id: nanoid(),
      blocks: [
        {
          id: nanoid(),
          type: "text",
          text: "Welcome!",
          color: "#202020",
          align: "center",
        },
        {
          id: nanoid(),
          type: "image",
          alt: "Welcome image",
          src: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: nanoid(),
          type: "text",
          text: "Check out our awesome menu!",
          color: "#202020",
          align: "center",
        },
        {
          id: nanoid(),
          type: "list",
          items: [
            {
              id: nanoid(),
              title: "Drinks",
              description: "Tshhh... Ahhhhh!",
              src: "https://img.icons8.com/0076FF/win10/247/kawaii-soda",
            },
            {
              id: nanoid(),
              title: "Icecream",
              description: "Cool down ...",
              src: "https://img.icons8.com/0076FF/win10/247/kawaii-cupcake",
            },
            {
              id: nanoid(),
              title: "Taccos",
              description: "... to heat up",
              src: "https://img.icons8.com/0076FF/win10/247/kawaii-taco",
            },
          ],
        },
        {
          id: nanoid(),
          type: "button",
          text: "Nice Menu!",
          color: "white",
          bgColor: "#0076FF",
        },
      ],
    },
    {
      id: nanoid(),
      blocks: [
        {
          id: nanoid(),
          type: "text",
          text: "Thanks for stopping by!",
          color: "#202020",
          align: "center",
        },
        {
          id: nanoid(),
          type: "image",
          src: "https://images.unsplash.com/photo-1578986568501-a6c637652d24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        },
        {
          id: nanoid(),
          type: "button",
          text: "Visit our website!",
          color: "white",
          bgColor: "#0076FF",
        },
      ],
    },
  ],
};

export const EXTENDED_FUNNEL_DATA: FunnelData = {
  name: "My extended funnel",
  bgColor: "#F5F5F5",
  pages: Array.from({ length: 12 }, (_, index) => ({
    id: nanoid(),
    blocks: [
      {
        id: nanoid(),
        type: "text",
        text: `Welcome to Page ${index + 1}`,
        color: "#202020",
        align: "center",
      },
      {
        id: nanoid(),
        type: "image",
        alt: `Welcome image for page ${index + 1}`,
        src: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: nanoid(),
        type: "text",
        text: `This is an awesome feature of Page ${index + 1}`,
        color: "#202020",
        align: "center",
      },
      {
        id: nanoid(),
        type: "list",
        items: [
          {
            id: nanoid(),
            title: "Feature 1",
            description: "Description of feature 1",
            src: "https://img.icons8.com/0076FF/win10/247/kawaii-soda",
          },
          {
            id: nanoid(),
            title: "Feature 2",
            description: "Description of feature 2",
            src: "https://img.icons8.com/0076FF/win10/247/kawaii-cupcake",
          },
          {
            id: nanoid(),
            title: "Feature 3",
            description: "Description of feature 3",
            src: "https://img.icons8.com/0076FF/win10/247/kawaii-taco",
          },
        ],
      },
      {
        id: nanoid(),
        type: "button",
        text: `Learn More on Page ${index + 1}`,
        color: "white",
        bgColor: "#0076FF",
      },
    ],
  })),
};

export const FUNNEL_DATA_SCHEMA = z.object({
  name: z.string(),
  bgColor: z.string(),
  pages: z.array(
    z.object({
      id: z.string(),
      blocks: z.array(
        z.union([
          z.object({
            id: z.string(),
            type: z.literal("text"),
            text: z.string(),
            color: z.string(),
            align: z.enum(["left", "center", "right"]),
          }),
          z.object({
            id: z.string(),
            type: z.literal("image"),
            alt: z.string().optional(),
            src: z.string(),
          }),
          z.object({
            id: z.string(),
            type: z.literal("list"),
            items: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
                src: z.string(),
              })
            ),
          }),
          z.object({
            id: z.string(),
            type: z.literal("button"),
            text: z.string(),
            color: z.string(),
            bgColor: z.string(),
          }),
        ])
      ),
    })
  ),
});

export const HEADER_HEIGHT = "48px";

export const FILE_UPLOAD_ACCEPT = { "application/json": [".json"] };
