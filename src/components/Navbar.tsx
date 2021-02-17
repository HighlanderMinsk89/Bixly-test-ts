import React, { useContext } from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/layout';

import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const handleAuth = () => {
    if (isAuthenticated) logout();
  };

  return (
    <Box bg="blue.300" w="100%" h="40px">
      <Flex justify="space-between" alignItems="center" h="100%">
        <Heading size="md" ml="2" p="2">
          Bixly React Test
        </Heading>
        <Flex alignItems="center">
          <Link>
            <Heading onClick={handleAuth} size="md" p="2">
              {isAuthenticated ? 'Logout' : 'Login'}
            </Heading>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
