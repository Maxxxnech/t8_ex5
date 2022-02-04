import React from "react";
import Modal from "./Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// Использует наследование от Modal, не рекомендуется
export default class ModalRandomUserInherit extends Modal {
  constructor(props) {
    super(props);
    this.state = { randomUserData: null };
    this.fetchRandomUser = this.fetchRandomUser.bind(this);
  }

  componentDidMount() {
    this.fetchRandomUser();
  }

  render() {
    if (!this.state.randomUserData) return null;
    const { picture } = this.state.randomUserData.results[0];
    // Метод this.closeModal будут взяты из родительского класса Modal
    return (
      <div className="modal" data-closer onClick={this.closeModal}>
        <div className="inner">
          <IconButton
            className="close"
            data-closer
            /*onClick={this.closeModal}*/
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon data-closer/>
          </IconButton>
          {this.props.children}
          <img src={picture.large} alt=""></img>
        </div>
      </div>
    );
  }

  fetchRandomUser() {
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((randomUserData) => this.setState({ randomUserData }));
  }
}
