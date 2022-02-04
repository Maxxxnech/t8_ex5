import React, { PureComponent } from "react";

// Использует композиционный поход, рекомедованный разработчиками Реакт
// Один компонент передается в другой
export default class RandomUserComp extends PureComponent {
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
    // Рендер содержит только изображение и потомков (ср с ModalRandomUserInherit)
    return (
      <>
        {this.props.children}
        <img src={picture.large} alt=""></img>
      </>
    );
  }

  fetchRandomUser() {
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((randomUserData) => this.setState({ randomUserData }));
  }
}
