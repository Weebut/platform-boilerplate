import React from 'react';
import { Button } from '@strapi/design-system/Button';
import ThumbUp from '@strapi/icons/ThumbUp';

const LinkButton = () => {
  return (
    <Button
      variant="secondary"
      startIcon={<ThumbUp />}
      onClick={() => alert('Hello World')}
    >
      Deploy
    </Button>
  );
};

export default LinkButton;
