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
import { Container } from '../components/Container';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Main } from '../components/Main';
import NavBar from '../components/NavBar';


const AddProject = () => {
    
    return (
    <Container height='100vh'>
        <NavBar pageProps={undefined} />
        <Main>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.900')}>
            <Stack spacing={8} mx={'auto'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Projects
                    </Heading>
                </Stack>
            </Stack>
        </Flex>
        </Main>
        <DarkModeSwitch />
    </Container>
    );
}

export default AddProject;

