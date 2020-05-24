import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import {
  ForkOutlined,
  TeamOutlined,
  PieChartOutlined,
  SettingOutlined,
  FullscreenOutlined,
  LockOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { browser } from 'webextension-polyfill-ts';
import PeersModal from 'components/PeersModal';
import OpenChannelModal from 'components/OpenChannelModal';
import { clearPasswordCache } from 'utils/background';
import MenuIcon from 'static/images/menu.svg';
import './SettingsMenu.less';

interface State {
  isChannelModalOpen: boolean;
  isPeersModalOpen: boolean;
}

export default class SettingsMenu extends React.Component<{}, State> {
  state: State = {
    isChannelModalOpen: false,
    isPeersModalOpen: false,
  };

  render() {
    const { isPeersModalOpen, isChannelModalOpen } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="channel" onClick={this.openChannelModal}>
          <a>
            <ForkOutlined /> Open channel
          </a>
        </Menu.Item>
        <Menu.Item key="peers" onClick={this.openPeersModal}>
          <a>
            <TeamOutlined /> Manage peers
          </a>
        </Menu.Item>
        <Menu.Item key="balances">
          <Link to="/balances">
            <PieChartOutlined /> Balances
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="settings">
          <Link to="/settings">
            <SettingOutlined /> Settings
          </Link>
        </Menu.Item>
        <Menu.Item key="full" onClick={this.openFullPage}>
          <a>
            <FullscreenOutlined /> Full page
          </a>
        </Menu.Item>
        <Menu.Item key="clear" onClick={this.clearAuth}>
          <a>
            <LockOutlined /> Lock account
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Dropdown
          className="SettingsMenu"
          overlay={menu}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button className="SettingsMenu-button" shape="circle">
            <Icon component={MenuIcon} />
          </Button>
        </Dropdown>
        <PeersModal isVisible={isPeersModalOpen} handleClose={this.closePeersModal} />
        <OpenChannelModal
          isVisible={isChannelModalOpen}
          handleClose={this.closeChannelModal}
        />
      </>
    );
  }

  private openFullPage = () => {
    browser.runtime.openOptionsPage();
    setTimeout(window.close, 100);
  };

  private clearAuth = () => {
    clearPasswordCache();
    setTimeout(window.close, 100);
  };

  private openChannelModal = () => this.setState({ isChannelModalOpen: true });
  private closeChannelModal = () => this.setState({ isChannelModalOpen: false });
  private openPeersModal = () => this.setState({ isPeersModalOpen: true });
  private closePeersModal = () => this.setState({ isPeersModalOpen: false });
}
