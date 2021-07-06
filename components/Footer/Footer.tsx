import {
  Box,
  Flex,
  chakra,
  Stack,
  Tooltip,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const SocialIcons = ({ children, href, label }) => {
  return (
    <Tooltip label={label}>
      <chakra.button
        bg={useColorModeValue(`blackAlpha.100`, `whiteAlpha.100`)}
        rounded="full"
        w={8}
        h={8}
        cursor="pointer"
        as="a"
        href={href}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition="background 0.3s ease"
        _hover={{
          bg: useColorModeValue(`blackAlpha.200`, `whiteAlpha.200`),
        }}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    </Tooltip>
  );
};
export const Footer: React.FC = (): React.ReactElement => (
  <Box as="footer" role="contentinfo" mt={8} py="6">
    <Flex
      direction={{ base: `column`, md: `row` }}
      maxW={{ base: `xl`, md: `7xl` }}
      mx="auto"
      px={{ base: `6`, md: `8` }}
      align="center"
    >
      <Stack direction="row" spacing={6} ml="auto" mr={{ base: `auto`, md: 5 }}>
        <SocialIcons label="GitHub" href="https://github.com/gillflix/">
          <FaGithub />
        </SocialIcons>
        <SocialIcons
          label="Twitter"
          href="https://twitter.com/gillflix"
        >
          <FaTwitter />
        </SocialIcons>

        <SocialIcons
          label="Discord"
          href="https://discord.com/invite/T8SUMA2tgf"
        >
          <FaDiscord />
        </SocialIcons>
      </Stack>
    </Flex>
  </Box>
);
