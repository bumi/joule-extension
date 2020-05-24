import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  inline?: boolean;
  size?: string;
}

const Loader: React.SFC<Props> = ({ inline, size }) => (
  <LoadingOutlined
    style={{
      color: '#8E44AD',
      fontSize: size || '2rem',
      position: inline ? undefined : 'absolute',
      top: inline ? undefined : '50%',
      left: inline ? undefined : '50%',
      transform: inline ? undefined : 'translate(-50%, -50%)',
    }}
  />
);

export default Loader;
