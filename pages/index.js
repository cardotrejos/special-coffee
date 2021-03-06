import Head from 'next/head'
import { request } from 'graphql-request'
import useSWR from 'swr'
import { Box, Image, Text, Spinner, Stack, Flex, PseudoBox, IconButton } from "@chakra-ui/core";
import { motion } from 'framer-motion'


const API = 'https://colombian-coffee.herokuapp.com/admin/api'
const fetcher = query => request(API, query)

const MotionBox = motion.custom(Box)

export default function Home() {
  const { data, error } = useSWR(
    `{
      allBrands{
        id
        name
        city
        image {
          publicUrl
        }
      }
  }`,
    fetcher
  )

  if (error) return "An error has occurred.";
  if (!data) return <Spinner size="xl" />;

  return (
    <>

      <Head>
        <title>Cafes Especiales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text fontSize={32} textAlign={[ 'left', 'center' ]} mt={30}>
          Vení tomemonos un cafecito
        </Text>

      </main>
      <Flex alignItems="center" justifyContent="center">
        {data.allBrands.map((brand) => {
          return (
            <MotionBox
              w='300px'
              rounded='20px'
              margin="2%"
              overflow='hidden'
              boxShadow='md'
              key={brand.id}
              whileHover={{ scale: 1.1 }}
              bg='gray.200'>
              <Image src={brand.image.publicUrl} alt="producer photo" />
              <Box>
                <Text fontWeight={'bold'} padding="3%">{brand.name}</Text>
                <Text padding="3%">{brand.city}</Text>
              </Box>

            </MotionBox>
          );
        })}
      </Flex>

    </>
  )
}
