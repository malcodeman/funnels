"use client";
import { FUNNEL_DATA, HEADER_HEIGHT } from "@/lib/constants";
import { Block, FunnelData } from "@/types";
import { useState } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Preview } from "./components/Preview";
import { Header } from "./components/Header";
import { PagesPanel } from "./components/PagesPanel";
import { DesignPanel } from "./components/DesignPanel";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { EmptyState } from "./components/EmptyState";

export default function Home() {
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [selectedBlock, setSelectedBlock] = useState<null | Block>(null);
  const form = useForm<FunnelData>({
    defaultValues: FUNNEL_DATA,
  });
  const { fields: pages } = useFieldArray({
    control: form.control,
    name: "pages",
  });

  function handleOnImport(funnel: FunnelData) {
    form.reset(funnel);
    setSelectedPageIndex(1);
    setSelectedBlock(null);
  }

  if (pages.length === 0) {
    return <EmptyState onImport={handleOnImport} />;
  }

  return (
    <>
      <FormProvider {...form}>
        <Header
          selectedPageIndex={selectedPageIndex}
          onImport={handleOnImport}
        />
      </FormProvider>
      <Box
        position="fixed"
        left="0"
        top={HEADER_HEIGHT}
        bottom="0"
        width="260px"
        height={`calc(100vh - ${HEADER_HEIGHT})`}
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
              <FormProvider {...form}>
                <PagesPanel
                  selectedPageIndex={selectedPageIndex}
                  selectedBlock={selectedBlock}
                  onSelectPage={(index) => setSelectedPageIndex(index)}
                  onSelectBlock={(block) => setSelectedBlock(block)}
                />
              </FormProvider>
            </TabPanel>
            <TabPanel>
              <FormProvider {...form}>
                <DesignPanel />
              </FormProvider>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <FormProvider {...form}>
        <Preview
          selectedPageIndex={selectedPageIndex}
          selectedBlockId={selectedBlock?.id}
          onSelectBlock={(block) => setSelectedBlock(block)}
        />
      </FormProvider>
      <FormProvider {...form}>
        <PropertiesPanel
          selectedPageIndex={selectedPageIndex}
          selectedBlock={selectedBlock}
        />
      </FormProvider>
    </>
  );
}
