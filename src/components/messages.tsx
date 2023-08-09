import {Slide, Box} from 'native-base';
import React from 'react';

function Messages({message}: any) {
  const [isOpenTop, setIsOpenTop] = React.useState(true);
  console.log(`Hello from ${message} the child`);
  return (
    <>
      {message && (
        <Slide
          in={isOpenTop}
          placement="top"
          style={{height: 100, minHeight: 100}}>
          <Box
            height="100"
            alignItems="center"
            justifyContent="center"
            p={10}
            _text={{
              color: 'white',
            }}
            bg="teal.400">
            {message}
          </Box>
        </Slide>
      )}
    </>
  );
}

export default Messages;
