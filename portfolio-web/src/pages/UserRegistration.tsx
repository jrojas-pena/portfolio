import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState, ChangeEvent, FormEvent } from "react";
  
  interface FormData {
    username: string;
    email: string;
    password: string;
  }
  
  const UserRegistration: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      username: "",
      email: "",
      password: "",
    });
  
    const toast = useToast();
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Add your logic to register the user here
  
      toast({
        title: "User registered",
        description: "User registration successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    return (
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg">
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    );
  };
  
  export default UserRegistration;
  