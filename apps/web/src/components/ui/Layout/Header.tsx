import Link from 'next/link';

import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    HStack,
    Icon,
    IconButton,
    Text,
    useBreakpointValue,
    useColorMode,
    useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FiEdit, FiHome, FiLayers, FiList, FiMenu, FiSun, FiUser, FiVideo } from 'react-icons/fi';
import { MdClose, MdDarkMode } from 'react-icons/md';

interface HeaderProps {}

export const Header = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true });
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <Box as="section">
            <Box as="nav" bg="bg-surface">
                <Container py={{ base: '4', lg: '5' }}>
                    <HStack spacing="10" justify="space-between">
                        <Avatar size="md" name="Dylan Young" src="https://avatars.githubusercontent.com/u/5227854?v=4" />
                        {isDesktop ? (
                            <>
                                <Flex justify="space-between" flex="1">
                                    <ButtonGroup variant="ghost" spacing="4">
                                        <Link href="/">
                                            <Button as="a">Home</Button>
                                        </Link>

                                        <Link href="/insights">
                                            <Button as="a">Insights</Button>
                                        </Link>

                                        <Link href="/apps">
                                            <Button as="a">My Projects</Button>
                                        </Link>

                                        <Link href="/speaking">
                                            <Button as="a">Speaking</Button>
                                        </Link>

                                        <Link href="/videos">
                                            <Button as="a">Videos</Button>
                                        </Link>

                                        <Button display="none">
                                            <Link href="/snippets">Snippets</Link>
                                        </Button>

                                        <Link href="/contact">
                                            <Button as="a">Contact</Button>
                                        </Link>
                                    </ButtonGroup>
                                    <HStack spacing="3">
                                        <IconButton
                                            variant="ghost"
                                            icon={colorMode == 'light' ? <MdDarkMode /> : <FiSun />}
                                            aria-label="Color Mode"
                                            onClick={toggleColorMode}
                                        />
                                    </HStack>
                                </Flex>
                            </>
                        ) : (
                            <HStack spacing="3">
                                <IconButton
                                    variant="ghost"
                                    icon={colorMode == 'light' ? <MdDarkMode /> : <FiSun />}
                                    aria-label="Color Mode"
                                    onClick={toggleColorMode}
                                />
                                <IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" onClick={onOpen} />
                            </HStack>
                        )}
                    </HStack>
                </Container>
                <Drawer placement="left" initialFocusRef={menuButtonRef} isOpen={isOpen} onClose={onClose} size="full">
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader padding="0">
                            <Container py={{ base: '4', lg: '5' }}>
                                <HStack spacing="10" justify="space-between">
                                    <Avatar size="md" name="Dylan Young" src="https://avatars.githubusercontent.com/u/5227854?v=4" />
                                    <HStack spacing="3">
                                        <IconButton
                                            variant="ghost"
                                            icon={colorMode == 'light' ? <MdDarkMode /> : <FiSun />}
                                            aria-label="Color Mode"
                                            onClick={toggleColorMode}
                                        />
                                        <IconButton variant="ghost" icon={<MdClose fontSize="1.25rem" />} aria-label="Open Menu" onClick={onClose} />
                                    </HStack>
                                </HStack>
                            </Container>
                        </DrawerHeader>
                        <DrawerBody>
                            <Link href="/">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiHome} />
                                    <Text fontWeight="medium">Home</Text>
                                </HStack>
                            </Link>
                            <Link href="/insights">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiLayers} />
                                    <Text fontWeight="medium">Insights</Text>
                                </HStack>
                            </Link>
                            <Link href="/insights/series">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiList} />
                                    <Text fontWeight="medium">Series</Text>
                                </HStack>
                            </Link>
                            <Link href="/apps">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiLayers} />
                                    <Text fontWeight="medium">Apps</Text>
                                </HStack>
                            </Link>
                            <Link href="/videos">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiVideo} />
                                    <Text fontWeight="medium">Videos</Text>
                                </HStack>
                            </Link>
                            <Link href="/about">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiUser} />
                                    <Text fontWeight="medium">About</Text>
                                </HStack>
                            </Link>
                            <Link href="/contact">
                                <HStack py="3" spacing="3">
                                    <Icon color="ghost" fontSize="xl" as={FiEdit} />
                                    <Text fontWeight="medium">Contact Me</Text>
                                </HStack>
                            </Link>
                            <HStack mt="6"></HStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Box>
    );
};
