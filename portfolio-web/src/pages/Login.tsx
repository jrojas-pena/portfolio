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
  
  interface LoginCardProps {}

  const LOGIN_MUTATION = `mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      user {
        username
        
      }
      error {
        field
        message
      }
    }
  }`

  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    const [{}, login] = useMutation(LOGIN_MUTATION);
  
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
              initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                console.log(JSON.stringify(values, null, 2));
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
              name="email"
              placeholder="Email"
              label="Email"
              type="email"
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
  