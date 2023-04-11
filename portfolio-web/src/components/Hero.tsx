import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100px"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
    py="100px"
  >
    <Heading fontSize="4vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Juan Rojas',
}
