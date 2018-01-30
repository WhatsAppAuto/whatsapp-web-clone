import React, { Component } from "react";
import { Div } from "glamorous";

import { ProfileHeader } from "./profileHeader";
import { SearchBar } from "./searchBar";
import { FriendsList } from "./friendsList";

import { ProfileInfo } from "./ProfileInfo";
import { ProfileSettings } from "./Settings";

export class Profile extends Component {
  constructor(context) {
    super(context);
    this.state = {
      searchBarValue: "",
      currentView: "friendList"
    };
  }

  wrapperStyle = {
    display: "grid",
    gridTemplateRows: "10% 6% 84%",
    height: "100vh",
    borderRight: "1px solid rgba(0, 0, 0, 0.05)"
  };

  profileHeaderWrapperStyle = {
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
  };

  searchBarWrapperStyle = { ...this.profileHeaderWrapperStyle };

  handleInputChange = ({ target }) => {
    this.setState({ searchBarValue: target.value });
  };

  handlePictureClick = _ => {
    this.setState({ currentView: "profileInfo" });
  };

  handleProfileSettingsClick = _ => {
    this.setState({ currentView: "profileSettings" });
  };

  handleProfileInfoBackClick = _ => {
    this.setState({ currentView: "friendList" });
  };

  getCurrentProfileView = _ => {
    switch (this.state.currentView) {
      case "profileInfo":
        return (
          <ProfileInfo
            handleProfileInfoBackClick={this.handleProfileInfoBackClick}
            picturePath={this.props.profileData.picture}
          />
        );

      case "profileSettings":
        return <ProfileSettings />;

      case "friendList":
        return (
          <Div css={this.wrapperStyle}>
            <Div css={this.profileHeaderWrapperStyle}>
              <ProfileHeader
                handlePictureClick={this.handlePictureClick}
                handleProfileSettingsClick={this.handleProfileSettingsClick}
                profileData={this.props.profileData}
              />
            </Div>
            <Div css={this.searchBarWrapperStyle}>
              <SearchBar
                handleInputChange={this.handleInputChange}
                searchBarValue={this.state.searchBarValue}
              />
            </Div>
            <Div>
              <FriendsList
                searchBarValue={this.state.searchBarValue}
                friendsList={this.props.profileData.friends}
                handleListItemClick={this.props.handleListItemClick}
              />
            </Div>
          </Div>
        );
    }
  };

  render() {
    return this.getCurrentProfileView();
  }
}
