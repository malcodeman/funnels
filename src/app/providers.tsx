"use client";

import { ChakraProvider } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export function Providers(props: Props) {
  return <ChakraProvider>{props.children}</ChakraProvider>;
}
