import React, { Component, Fragment } from 'react';
import { Div } from 'glamorous';

import { ChatBoxHeader } from './ChatBoxHeader';
import { ChatBoxDisplay } from './ChatBoxDisplay';
import { ChatBoxFooter } from './ChatBoxFooter';
import ContextBox from './ContextBox';
import ModalDialog from '../ModalDialog';

export default class ChatBox extends Component {
  state = {
    // FIXME chatlog and messages represent the same thing yet they live seperated
    // There should only be one representation. Ideally these messages should be reflected in the
    messages: [],

    // FIXME Move This State Into it's own component and pass it as a render prop.
    // FIXME `is` prefix probably uncessary. I will probably choose showContextBox
    isContextBoxActive: false,
    // FIXME Bad naming. Instead use type or something to represent contact info or search.
    isContactInfoContextBoxActive: false,

    // FIXME Move Into it's own component and pass it as a render prop.
    modalDialog: {
      show: false,
      view: ''
    }
  };

  wrapperStyleWithoutContextBox = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100%'
  };
  wrapperStyleWithContextBox = {
    ...this.wrapperStyleWithoutContextBox,
    gridTemplateColumns: '5.7fr 4.3fr'
  };

  handleFriendChatHeaderClick = _ => {
    this.setState({
      isContactInfoContextBoxActive: true,
      isContextBoxActive: true
    });
  };
  handleSearchClick = _ => {
    this.setState({
      isContextBoxActive: true,
      isContactInfoContextBoxActive: false
    });
  };
  handleCancelClick = _ => {
    this.setState({
      isContextBoxActive: false,
      isContactInfoContextBoxActive: false
    });
  };

  handleDeleteChatClick = _ => {
    this.setState({ modalDialog: { show: true, view: 'deleteChat' } });
  };
  handleClearChatClick = _ => {
    this.setState({ modalDialog: { show: true, view: 'clearChat' } });
  };
  handleMuteClick = _ => {
    this.setState({ modalDialog: { show: true, view: 'mute' } });
  };
  handleReportSpamClick = _ => {
    this.setState({ modalDialog: { show: true, view: 'reportSpam' } });
  };
  handleBlockContactClick = _ => {
    this.setState({ modalDialog: { show: true, view: 'blockContact' } });
  };
  handleModalCancel = _ => {
    this.setState({ modalDialog: { show: false, view: '' } });
  };

  handleChatSend = message => {
    const freshMessages = [message, ...this.state.messages];
    if (message) this.setState({ messages: freshMessages });
  };

  componentWillReceiveProps(nextProps) {
    const { chatBoxContext: currentChatBoxContext } = this.props;
    const { chatBoxContext: nextChatBoxContext } = nextProps;
    if (currentChatBoxContext) {
      if (currentChatBoxContext.id !== nextChatBoxContext.id)
        this.setState({ isContextBoxActive: false });
    }
  }

  render() {
    const { chatBoxContext, checkForLastChat, backgroundColor } = this.props;
    const {
      messages,
      isContextBoxActive,
      isContactInfoContextBoxActive,
      modalDialog
    } = this.state;
    const wrapperStyle = isContextBoxActive
      ? this.wrapperStyleWithContextBox
      : this.wrapperStyleWithoutContextBox;

    return (
      <Fragment>
        <Div css={wrapperStyle}>
          <Div
            css={{
              display: 'grid',
              gridTemplateRows: '10% 80% 10%',
              height: '100vh'
            }}
          >
            <Div>
              {chatBoxContext ? (
                <ChatBoxHeader
                  chatBoxContext={chatBoxContext}
                  handleSearchClick={this.handleSearchClick}
                  handleFriendChatHeaderClick={this.handleFriendChatHeaderClick}
                  handleDeleteChatClick={this.handleDeleteChatClick}
                  handleClearChatClick={this.handleClearChatClick}
                  handleMuteClick={this.handleMuteClick}
                />
              ) : null}
            </Div>
            <Div>
              {chatBoxContext ? (
                <ChatBoxDisplay
                  chatlog={chatBoxContext.chatlog}
                  messages={messages}
                  backgroundColor={backgroundColor}
                />
              ) : null}
            </Div>
            <Div>
              {chatBoxContext ? (
                <ChatBoxFooter
                  isInitialScreen={false}
                  handleChatSend={this.handleChatSend}
                  checkForLastChat={checkForLastChat}
                />
              ) : (
                <ChatBoxFooter isInitialScreen={true} />
              )}
            </Div>
          </Div>
          {isContextBoxActive ? (
            <Div>
              <ContextBox
                isContactInfoContextBoxActive={isContactInfoContextBoxActive}
                name={chatBoxContext.name}
                messagesLog={chatBoxContext.chatlog}
                picturePath={chatBoxContext.picture}
                handleCancelClick={this.handleCancelClick}
                handleDeleteChatClick={this.handleDeleteChatClick}
                handleReportSpamClick={this.handleReportSpamClick}
                handleBlockContactClick={this.handleBlockContactClick}
              />
            </Div>
          ) : null}
        </Div>
        {modalDialog.show ? (
          <ModalDialog
            type={modalDialog.view}
            handleModalCancel={this.handleModalCancel}
            name={chatBoxContext.name}
          />
        ) : null}
      </Fragment>
    );
  }
}
