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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
// import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
// import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
// import { createUrqlClient } from "../utils/createUrqlClient";
// import { withApollo } from "../utils/withApollo";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Formik initialValues={{ email: "", username: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                // const response = await register({
                //   variables: { options: values },
                //   update: (cache, { data }) => {
                //     cache.writeQuery<MeQuery>({
                //       query: MeDocument,
                //       data: {
                //         __typename: "Query",
                //         me: data?.register.user,
                //       },
                //     });
                //   },
                // });
                // if (response.data?.register.errors) {
                //   setErrors(toErrorMap(response.data.register.errors));
                // } else if (response.data?.register.user) {
                //   // worked
                //   router.push("/");
                // }
              }}
            >
            <HStack>
              <Box>
                {/* <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl> */}
                <InputField name={'firstName'} label={'First Name'}  />
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href="/Login">Login</Link>
              </Text>
            </Stack>
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
