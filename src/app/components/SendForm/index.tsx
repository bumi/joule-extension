import React from 'react';
import { Radio } from 'antd';
import { ThunderboltOutlined, LinkOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import LightningSend from './LightningSend';
import ChainSend from './ChainSend';
import { AppState } from 'store/reducers';
import './style.less';
import { connect } from 'react-redux';
import { blockchainDisplayName } from 'utils/constants';
import { getNodeChain } from 'modules/node/selectors';

interface StateProps {
  chain: ReturnType<typeof getNodeChain>;
}

interface OwnProps {
  close?(): void;
}

type Props = StateProps & OwnProps;

interface State {
  type: 'lightning' | 'bitcoin';
}

class SendForm extends React.Component<Props, State> {
  state: State = {
    type: 'lightning',
  };

  render() {
    const { type } = this.state;
    const { chain } = this.props;

    const form =
      type === 'lightning' ? (
        <LightningSend close={this.props.close} />
      ) : (
        <ChainSend close={this.props.close} />
      );

    return (
      <div className="SendForm">
        <div className="SendForm-type">
          <Radio.Group value={type} onChange={this.handleTypeChange}>
            <Radio.Button value="lightning">
              <ThunderboltOutlined /> Lightning
            </Radio.Button>
            <Radio.Button>
              <LinkOutlined /> {blockchainDisplayName[chain]}
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="SendForm-form">{form}</div>
      </div>
    );
  }

  private handleTypeChange = (ev: RadioChangeEvent) => {
    this.setState({ type: ev.target.value });
  };
}

export default connect<StateProps, {}, OwnProps, AppState>(state => ({
  chain: getNodeChain(state),
}))(SendForm);
