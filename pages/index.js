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
        <h1>
          Vení tomemonos un cafecito
        </h1>

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
                <Text padding="3%">{brand.name}</Text>
                <Text padding="3%">{brand.city}</Text>
              </Box>

            </MotionBox>
          );
        })}
      </Flex>
      <Flex
        w='100vw'
        bg='gray.200'
        align='flex-end'
        color='black'
        justify='center'
        align='center'
        fontSize={['md', 'lg', 'xl', 'xl']}
        h='7vh'
        boxShadow='md'
        p={2}>
        <Flex w={['100vw', '100vw', '80vw', '80vw']} justifyContent='center'>
          <Box>
            <Text>Created by Ricardo Trejos</Text>
          </Box>

          <Box>

          </Box>
        </Flex>
      </Flex>





    </>
  )
}
