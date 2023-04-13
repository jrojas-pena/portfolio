import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    <Button
      as={ChakraLink}
      isExternal
      href="https://github.com/jrojas-pena"
      variant="solid"
      colorScheme="blue"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      View GitHub
    </Button>
  </Container>
)
