import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box, useColorModeValue } from "@chakra-ui/core";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Form() {
  const bgColor = useColorModeValue("white.200", "white.700");
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = index => {
    console.log(index);
    setTabIndex(index);
  };
  return (
    <Box bgColor={bgColor} p={3} w="100%" boxShadow="lg" borderRadius="sm">
      <Tabs isFitted colorScheme="orange" index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab _focus={{ boxShadow: "none" }}>登录</Tab>
          <Tab _focus={{ boxShadow: "none" }}>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
