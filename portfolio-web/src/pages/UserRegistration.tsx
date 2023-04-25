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
import { useRouter } from 'next/router';
import { useRegisterUserMutation, UsernamePasswordInput } from '../gql/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const SignupCard: React.FC<{}> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [{}, register] = useRegisterUserMutation();

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
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Formik
              initialValues={{ firstName: '', lastName: '', username: '', password: '' }}
              onSubmit={async (values, {setErrors}) => {
                const response = await register(
                  { options: {
                      password: values.password,
                      username : values.username},
                    user: { 
                      firstName: values.firstName,
                      lastName: values.lastName}});
                const singupResponse = response.data.createUser as typeof response.data.createUser & {
                  error: { field: string; message: string }[];
                  user: { id: number; username: string };
                };
                if (singupResponse.error){
                  setErrors(toErrorMap(singupResponse.error))
                }
                else if (singupResponse.user){
                  router.push('/');
                }
              }}
            >
            {({ isSubmitting }) => (
            <Form>
            <HStack>
              <Box>
                <InputField
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  type="text"
                />
              </Box>
              <Box>
                <InputField
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  type="text"
                />
              </Box>
            </HStack>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
              type="text"
            />
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
            >
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
            </InputField>
            <Stack spacing={10} pt={3}> 
            <Button
                loadingText="Submitting"
                type="submit"
                isLoading={isSubmitting}
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
            </Form>
            )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(SignupCard);