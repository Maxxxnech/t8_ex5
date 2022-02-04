import React, { PureComponent } from "react";
// Higher-order component (HOC) -  функция, принимающая в качестве аргумента другой компонент и
// делающая с этим компонентом что-то. Часто это передача пропсов.
//** Пример - универсальная функция для добавления изображения к модальному окну **
// В данном случае ыторым компонентом передаем адрес изображения
// Третьим - коллбэк для получения src из полученных данных

export default function withImage(WrappedComponent, URL, getPicture) {

  // Возвращаем другой компонент, оборачивающий переданный
   class WithImage extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { userData: null };
      //this.handleChange = this.handleChange.bind(this);
      this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
      this.fetchUser();
    }
    render() {
      if (!this.state.userData) return null;

      const {picture} = getPicture(this.state.userData);
      console.log(this.props.children);
      // Рендерим переданный компонент wrappedComponent
      // Важно: передаем ему оставшиеся пропсы {...this.props}
      return (
        <WrappedComponent  {...this.props}>
          <h2>Модальное окно - компонент высшего порядка</h2>
          <img src={picture.large} alt="" />
        </WrappedComponent>
      );
    }

    fetchUser() {
      fetch(URL)
        .then((response) => response?.json())
        .then((userData) => this.setState({ userData }));
    }
  };
  // Для отладки в developer tools
  WithImage.displayName = `WithImage(${getDisplayName(WrappedComponent)})`
  
  return WithImage
}

// Получаем имя обернутого компонента
function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || "component";
}