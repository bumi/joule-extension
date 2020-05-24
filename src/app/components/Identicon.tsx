import React from 'react';
import classnames from 'classnames';
import { toSvg } from 'jdenticon';
import { QuestionOutlined } from '@ant-design/icons';
import './Identicon.less';

interface Props extends React.HTMLProps<HTMLDivElement> {
  pubkey: string;
  size?: number;
}

const Identicon: React.SFC<Props> = ({ pubkey, size, ...rest }) => {
  size = size || 100;
  let identicon;
  if (pubkey) {
    identicon = toSvg(pubkey, size || 100);
    return (
      <div
        {...rest}
        className={classnames('Identicon', rest.className)}
        dangerouslySetInnerHTML={{ __html: identicon }}
      />
    );
  } else {
    return (
      <div className={classnames('Identicon', rest.className)}>
        <QuestionOutlined />
      </div>
    );
  }
};

export default Identicon;
