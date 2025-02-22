import { HStack, Text } from '@chakra-ui/react';
import { BsHeartFill, BsHeartHalf, BsHeart } from 'react-icons/bs';
import React from 'react';

export const Rating = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}): React.ReactElement => {
  if (numReviews === 0) {
    return <Text>No reviews</Text>;
  }
  const stars = [];
  const roundedRating = Math.round(rating) / 2;
  for (let i = 0; i < 5; i++) {
    if (i + 0.5 === roundedRating) {
      stars.push(<BsHeartHalf key={`${i}-half-star`} />);
    } else if (i < roundedRating) {
      stars.push(<BsHeartFill key={`${i}-full-star`} />);
    } else {
      stars.push(<BsHeart key={`${i}-empty-star`} />);
    }
  }

  return <HStack direction="row">{stars}</HStack>;
};
