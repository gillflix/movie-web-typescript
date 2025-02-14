import React, { useState, useContext } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  useColorModeValue,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Avatar,
  SimpleGrid,
  HStack,
  Box,
  Flex,
  ModalFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverCloseButton,
  ButtonGroup,
  PopoverBody,
  PopoverArrow,
  PopoverFooter,
  useToast,
  chakra,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useBetween } from 'use-between';
import { format } from 'date-fns';
import { useQueryClient } from 'react-query';
import { MovieType, ReviewType } from '../../models/movie';
import { UserType } from '../../models/user';
import { AddIcon, CopyIcon } from '@chakra-ui/icons';
import { ReviewModalContext, useMovie } from '../../utils/ModalContext';

interface MovieDetailsModalProps {
  isOpen: any;
  onClose: any;
  movie: MovieType<ReviewType<UserType>[]>;
  user: UserType;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  isOpen,
  onClose,
  movie,
  user,
}): React.ReactElement => {
  const { setMovie: setModalMovie } = useBetween(useMovie);
  const { onOpen: reviewOnOpen } = useContext(ReviewModalContext);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const avatarSize = useBreakpointValue({ base: 'sm', md: 'xl' });

  const open = () => setIsPopoverOpen(!isPopoverOpen);
  const close = () => setIsPopoverOpen(false);
  const initialRef = React.useRef();

  const toast = useToast();
  const queryClient = useQueryClient();
  const handleMovieDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      close();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/movie`,
        {
          method: `delete`,
          // eslint-disable-next-line no-underscore-dangle
          body: JSON.stringify({ id: movie?._id }),
        }
      );
      const data = await response.json();

      setLoading(false);

      onClose();
      if (response.status !== 200) {
        return toast({
          variant: `solid`,
          title: `There was an error`,
          description: data.message,
          status: `error`,
          duration: 5000,
          isClosable: true,
        });
      }
      await queryClient.invalidateQueries(`movies`);

      toast({
        variant: `solid`,
        title: `Movie Deleted`,
        description: `${data.name} was deleted successfully :)`,
        status: `success`,
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      toast({
        variant: `solid`,
        title: `There was an error`,
        description: err.message,
        status: `error`,
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        id={'movie-details-modal'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottom="1px solid"
            borderColor={useColorModeValue(`gray.300`, `gray.600`)}
          >
            <Flex
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <Heading>{movie?.name}</Heading>
              <Heading mr={10}>
                {movie?.numReviews > 0
                  ? movie?.rating.toFixed(1)
                  : 'No reviews'}
                {movie?.numReviews > 0 && (
                  <chakra.span fontSize="xl" color={'gray.500'}>
                    {' '}
                    /10
                  </chakra.span>
                )}
              </Heading>
            </Flex>

            <Text>{movie?.tagLine}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody my={3}>
            <Accordion allowToggle defaultIndex={[1]}>
              <AccordionItem border="none">
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="semibold"
                      fontSize="2xl"
                    >
                      Description
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{movie?.description}</AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="semibold"
                      fontSize="2xl"
                    >
                      Reviews
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel height="full" overflowY="scroll" my={5}>
                  {movie?.reviews?.length > 0 ? (
                    <SimpleGrid columns={1} spacingY={5}>
                      {movie?.reviews?.map((review, i) => (
                        <Flex width="100%" key={`${i.toString}review`}>
                          <Avatar
                            size={avatarSize}
                            src={
                              review?.user?.avatar
                                ? `https://cdn.discordapp.com/avatars/${review.user.id}/${review.user.avatar}`
                                : `https://cdn.discordapp.com/embed/avatars/${
                                    Number(user.discriminator) % 5
                                  }.png`
                            }
                          />
                          <Flex
                            ml={3}
                            direction="column"
                            width="full"
                            isTruncated
                            pr={3}
                          >
                            <HStack
                              justifyContent="space-between"
                              width="full"
                              isTruncated
                            >
                              <Text
                                fontSize={{ base: 'lg', md: '3xl' }}
                                fontWeight="semibold"
                                alignSelf="flex-start"
                              >
                                {review.user.username}#
                                {review.user.discriminator}
                              </Text>
                              <Text
                                fontSize={{ base: 'lg', md: '3xl' }}
                                fontWeight="semibold"
                                mr={4}
                              >
                                {review.rating.toFixed(1)}
                                <chakra.span fontSize="md" color="gray.500">
                                  {' '}
                                  /10
                                </chakra.span>
                              </Text>
                            </HStack>
                            <Flex maxW="full" justifyContent="space-between">
                              <Text textAlign="left" isTruncated>
                                {review.comment || 'No comment provided...'}
                              </Text>
                              <Button
                                as={'a'}
                                href={`${process.env.NEXT_PUBLIC_APP_URI}/user/${review.user._id}`}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                              >
                                Visit profile
                              </Button>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Flex width="full" justifyContent="center">
                      <Text fontSize="xl">No Reviews Yet...</Text>
                    </Flex>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter
            bg={useColorModeValue(`gray.50`, `gray.800`)}
            roundedBottom="md"
          >
            <Flex mr="auto">
              <Text fontWeight="semibold">
                Created •{` `}
                {movie &&
                  format(new Date(movie?.createdAt), `dd/MM/yy • HH:mm:ss`)}
              </Text>
            </Flex>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Button
                leftIcon={<CopyIcon />}
                onClick={() => {
                  toast({
                    variant: 'solid',
                    title: 'Copied to clipboard',
                    description: `${movie?.name} copied to clipboard`,
                    isClosable: true,
                    duration: 5000,
                    status: 'success',
                  });
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_APP_URI}/?movieID=${movie?._id}`
                  );
                }}
                variant="outline"
              >
                Share
              </Button>
              <Button
                leftIcon={<AddIcon />}
                onClick={() => {
                  setModalMovie(movie);
                  onClose();
                  return reviewOnOpen();
                }}
                colorScheme="red"
              >
                Add review
              </Button>
              {user.isAdmin && movie?.createdAt && (
                <Popover
                  isOpen={isPopoverOpen}
                  onClose={close}
                  onOpen={open}
                  placement="right"
                >
                  <PopoverTrigger>
                    <Button colorScheme="red" isLoading={loading}>
                      Delete film
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent>
                    <PopoverHeader fontWeight="semibold">
                      Confirmation
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      Are you sure you want to delete {movie.name}?
                    </PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button variant="outline" onClick={close}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleMovieDelete}>
                          Confirm
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              )}
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
