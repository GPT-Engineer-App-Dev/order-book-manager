import React, { useState } from "react";
import { Container, VStack, Heading, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("");
  const [side, setSide] = useState("BUY");
  const toast = useToast();

  const addOrder = () => {
    if (!price || !volume || !side) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newOrder = { price, volume, side };
    setOrders([...orders, newOrder]);
    setPrice("");
    setVolume("");
    setSide("BUY");
    toast({
      title: "Success",
      description: "Order added successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={10}>
        <Heading>Order Book Manager</Heading>
        <VStack as="form" spacing={5} w="full">
          <FormControl>
            <FormLabel>Price Limit</FormLabel>
            <NumberInput min={0} value={price} onChange={(valueString) => setPrice(valueString)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Volume</FormLabel>
            <NumberInput min={0} value={volume} onChange={(valueString) => setVolume(valueString)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Side</FormLabel>
            <Select value={side} onChange={(e) => setSide(e.target.value)}>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </Select>
          </FormControl>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addOrder}>
            Add Order
          </Button>
        </VStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Price Limit</Th>
              <Th>Volume</Th>
              <Th>Side</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td>{order.price}</Td>
                <Td>{order.volume}</Td>
                <Td>{order.side}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
