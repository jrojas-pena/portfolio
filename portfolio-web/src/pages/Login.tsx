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
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '../gql/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
  
  interface LoginCardProps {}


  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [{}, login] = useLoginMutation();
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
          </Stack>
          <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values, {setErrors}) => {
                const response = await login({options: values});
                if (response.data?.login.error){
                  setErrors(toErrorMap(response.data.login.error))
                }
                else if (response.data?.login.user){
                  router.push('/');
                }
              }}
            >

            {({ isSubmitting }) => (
            <Form>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
              
             
            <Stack spacing={4}>
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
              <Stack spacing={10} pt={2}>
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
                  Login
                </Button>
                
              </Stack>
            </Stack>
          </Box>
          </Form>
          )}
        </Formik>
        </Stack>
      </Flex>
    );
  }
  