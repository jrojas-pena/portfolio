import { Image, Icon, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";


function Logo(): JSX.Element
{
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    if (isDark) {
        return (
            <Icon viewBox="0 0 50 50" w="70" h="70">
                <Link href="/">
                <image href="https://i.imgur.com/bTszIyy.png" height="50" width="50" />
                </Link>
            </Icon>
        );
    } else {
        return (
            <Icon viewBox="0 0 50 50" w="70" h="70">
                <Link href="/">
                <image href="https://i.imgur.com/XMDitM5.png" height="50" width="50" />
                </Link>
            </Icon>
        );
    }
}

export default Logo;