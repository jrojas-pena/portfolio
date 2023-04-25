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
  } from '@chakra-ui/react';
import { useState } from 'react';
import NavBar from "../components/NavBar";
import { Container } from '../components/Container';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

export default function Contact() {
    
    return (
        <Container height={'100vh'} maxW={'100vw'} bg={'gray.100'}>
        <NavBar pageProps={undefined} />
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.900')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Contact
                    </Heading>
            </Stack>
            </Stack>
        </Flex>
        <DarkModeSwitch />
        </Container>
    );
}


