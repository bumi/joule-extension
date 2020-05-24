import React from 'react';
import { Popover } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import './index.less';

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Help: React.SFC<Props> = ({ children, title }) => (
  <Popover content={children} title={title} arrowPointAtCenter>
    <div className="Help">
      <QuestionCircleFilled />
    </div>
  </Popover>
);

export default Help;
