"use client";
import { FUNNEL_DATA } from "@/lib/constants";
import { Block, FunnelData } from "@/types";
import { useState } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Preview } from "./components/Preview";
import { Header } from "./components/Header";
import { PagesPanel } from "./components/PagesPanel";
import { DesignPanel } from "./components/DesignPanel";
import { PropertiesPanel } from "./components/PropertiesPanel";

export default function Home() {
  const [funnel] = useState<FunnelData>(FUNNEL_DATA);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [selectedBlock, setSelectedBlock] = useState<null | Block>(null);

  return (
    <>
      <Header name={funnel.name} />
      <Box
        position="fixed"
        left="0"
        top="40px"
        bottom="0"
        width="260px"
        height="calc(100vh - 40px)"
        bgColor="gray.800"
        zIndex="1"
      >
        <Tabs isFitted height="full">
          <TabList>
            <Tab>Pages</Tab>
            <Tab>Design</Tab>
          </TabList>
          <TabPanels height="full" overflowY="scroll" pb="42px">
            <TabPanel padding="0">
              <PagesPanel
                funnel={funnel}
                index={selectedPageIndex}
                onChange={(index) => setSelectedPageIndex(index)}
                onSelectedBlock={(block) => setSelectedBlock(block)}
              />
            </TabPanel>
            <TabPanel>
              <DesignPanel funnel={funnel} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Preview funnel={funnel} pageIndex={selectedPageIndex} />
      <PropertiesPanel selectedBlock={selectedBlock} />
    </>
  );
}
