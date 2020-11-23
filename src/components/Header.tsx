import React from 'react';
import {
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import NextLink from 'next/link';
import { siteConfig, route } from 'config';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';
import NavLink from './NavLink';

const GithubIcon = (props) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

function HeaderContent() {
  const mobileNav = useDisclosure();
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              <Heading>{siteConfig.title}</Heading>
            </chakra.a>
          </NextLink>
          <HStack as="nav" spacing="4" ml="24px" display={{ base: 'none', md: 'flex' }}>
            <NavLink href={route.list}>List</NavLink>
            <NavLink href={route.quiz}>Quiz</NavLink>
            <NavLink href={route.about}>About</NavLink>
          </HStack>
        </Flex>

        <Flex maxW="720px" align="center" color="gray.400">
          <HStack spacing="8">
            <Link isExternal aria-label="GitHub" href={siteConfig.github.link}>
              <Icon
                as={GithubIcon}
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </HStack>

          <ColorModeSwitcher />
          {/*<MobileNavButton*/}
          {/*  ref={mobileNavBtnRef}*/}
          {/*  aria-label="Open Menu"*/}
          {/*  onClick={mobileNav.onOpen}*/}
          {/*/>*/}
        </Flex>
      </Flex>
      {/*<MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />*/}
    </>
  );
}

function Header(props) {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef<HTMLHeadingElement>();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s"
      pos="fixed"
      top="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      borderTop="6px solid"
      borderTopColor="teal.400"
      width="full"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1200px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
}

export default Header;