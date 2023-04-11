import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Container,
  } from '@chakra-ui/react';
import { useState } from 'react';
import NavBar from "../components/NavBar";


export default function Projects() {
    
    return (
        <Container height={'100vh'} maxW={'100vw'} bg={'gray.100'}>
        <NavBar />
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Projects
                    </Heading>
            </Stack>
            </Stack>
        </Flex>
        </Container>
    );
}

