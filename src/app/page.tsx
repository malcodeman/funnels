"use client";
import { FUNNEL_DATA, HEADER_HEIGHT } from "@/lib/constants";
import { FunnelData } from "@/types";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useBlockStore, usePageIndexStore } from "@/state";
import { Preview } from "./components/Preview";
import { Header } from "./components/Header";
import { PagesPanel } from "./components/PagesPanel";
import { DesignPanel } from "./components/DesignPanel";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { EmptyState } from "./components/EmptyState";

export default function Home() {
  const { setSelectedPageIndex } = usePageIndexStore();
  const { setSelectedBlock } = useBlockStore();
  const form = useForm<FunnelData>({
    defaultValues: FUNNEL_DATA,
  });
  const { fields: pages } = useFieldArray({
    control: form.control,
    name: "pages",
  });
  const backgroundColor = useColorModeValue("white", "gray.800");

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
        <Header />
      </FormProvider>
      <Box
        top={HEADER_HEIGHT}
        bgColor={backgroundColor}
        height={`calc(100vh - ${HEADER_HEIGHT})`}
        position="fixed"
        left="0"
        bottom="0"
        width="260px"
        zIndex="1"
      >
        <Tabs isFitted height="full">
          <TabList>
            <Tab data-testid="pages-tab">Pages</Tab>
            <Tab data-testid="design-tab">Design</Tab>
          </TabList>
          <TabPanels height="full" overflowY="scroll" pb="42px">
            <TabPanel padding="0">
              <FormProvider {...form}>
                <PagesPanel />
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
        <Preview />
      </FormProvider>
      <FormProvider {...form}>
        <PropertiesPanel />
      </FormProvider>
    </>
  );
}
