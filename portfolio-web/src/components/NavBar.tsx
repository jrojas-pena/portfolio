import {
    Box,
    Flex,
    Spacer,
    Link,
    HStack
} from "@chakra-ui/react";
import React from "react";

interface NavBarProps {
    title: string;
    logo: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ title, logo }) => (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="blue.500"
            color="white"
            position={{ base: "fixed", md: "relative" }}
            width="full"
        >
            <Flex align="center" mr={5}
                as="a"
                href="/"
                title="Cafe Programming"
                aria-label="Cafe Programming"
            >
                {logo}
                <Box ml="2" fontWeight="semibold" as="h1">
                    {title}
                </Box>
            </Flex>

            <Spacer />

            <HStack spacing={8} align="center">
                <Link
                    as="a"
                    href="/"
                    fontSize="lg"
                    fontWeight="medium"
                    color="white"
                    _hover={{ color: "gray.400" }}
                >
                    Home
                </Link>
                <Link
                    as="a"
                    href="/about"
                    fontSize="lg"
                    fontWeight="medium"
                    color="white"
                    _hover={{ color: "gray.400" }}
                >
                    About
                </Link>
                <Link
                    as="a"
                    href="/contact"
                    fontSize="lg"
                    fontWeight="medium"
                    color="white"
                    _hover={{ color: "gray.400" }}
                >
                    Contact
                </Link>
            </HStack>
        </Flex>
)

export default NavBar;