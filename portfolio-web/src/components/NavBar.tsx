import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
import  NextLink  from 'next/link';
import { useLogoutMutation, useMeQuery } from '../gql/graphql';
import { useState } from 'react';


const Links = [ 'Projects', 'About', 'Contact'];

const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
  <>
  <NextLink href={"/" + link} passHref legacyBehavior>
  <Link
    px={2}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.300', 'gray.700'),
    }}
    href={"/" + link}>
    {children}
  </Link>
  </NextLink>
  </> 
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{data, fetching}] = useMeQuery();
  const [{}, logout] = useLogoutMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(data?.me ? true : false);

  const handleLogout = async () => {
    await logout({});
    setIsLoggedIn(false);
  }

  let user = null;
  if(!isLoggedIn){
    user = (
      <>
      <HStack>
                <NextLink href="/Login" passHref legacyBehavior>
                <Link><Button variant="solid" colorScheme="blue" size="md" mr={2}>Login</Button></Link>
                </NextLink>
                <NextLink href="/UserRegistration" passHref legacyBehavior>
                <Link><Button variant="outline" colorScheme="blue" size="md">Sign Up</Button></Link>
                </NextLink>
      </HStack>
      </>
    )
  }
  else {
    user = (
      <>
      <Flex alignItems={'center'}>
      <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
              <HStack spacing={2} alignItems={'center'}>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />

            <Text ml={2}>{data.me.username}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem><NextLink href="/AddProject" passHref legacyBehavior><Link>Create Post</Link></NextLink></MenuItem>
            <MenuItem><NextLink href="/Projects" passHref legacyBehavior><Link>View Posts</Link></NextLink></MenuItem>
            <MenuDivider />
            <MenuItem><Link onClick={()=>{handleLogout();}}>Logout</Link></MenuItem>
          </MenuList>
      </Menu>
      </Flex>
      </>
    )
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'black')} px={4} width="full" boxShadow='base' fontFamily="roboto" fontWeight="semibold">
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
            <HStack spacing={8} alignItems={'center'} >
                
            <HStack spacing={8} alignItems={'center'}>
                <Box><Logo/></Box>
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} link={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {user}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} link={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
