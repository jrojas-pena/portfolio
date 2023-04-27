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
import { usePostsQuery } from '../gql/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


const Projects = () => {
    const [{data}] = usePostsQuery();
    return (
    <Container minH='100vh'>
        <NavBar pageProps={undefined} />
        <Main>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.900')}>
            <Stack spacing={8} mx={'auto'} py={12} px={6}>                    
                <Stack borderWidth='1px' shadow={'md'} width={'60vw'} align={'center'} pb={2} bg={useColorModeValue('gray.100', 'black')}>
                    <Heading fontSize={'5xl'} textAlign={'center'} my={5}>
                        Projects
                    </Heading>
                    {!data ? null : data?.posts.map((post) => (
                        <Box 
                            as="a" 
                            href={`/post/${post.id}`} 
                            key={post.id} 
                            mt={2} 
                            borderWidth='1px' width={'lg'} shadow={'md'} 
                            bg={useColorModeValue('gray.50', 'gray.900')}> 
                            <Heading size={'md'} mt={3} ml={3}>{post.title}</Heading> <br/> 
                            <Text mb={3} ml={3}>{post.body}</Text>
                        </Box>))}
                </Stack>
            </Stack>
        </Flex>
        </Main>
        <DarkModeSwitch />
    </Container>
    );
}

export default withUrqlClient(createUrqlClient)(Projects);

