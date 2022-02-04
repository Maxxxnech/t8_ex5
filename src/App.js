import "./App.css";
import React, { PureComponent } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
//Блок для отображения модальных окон и их кнопок окрытия
import Display from "./components/Display";

// простое модальное окно, родительский класс
import Modal from "./components/Modal";

// Модальное окно, наследующее от Modal. Не рекомендуется
//Выводит фото случайного юзера
import ModalRandomUserInherit from "./components/ModalRandomUserInherit";

// Модальное окно, используещееся в композиции с Modal.
// Выводит фото случайного юзера. Будет передано Modal в props.children
import RandomUserComp from "./components/RandomUserComp";

// Функция, возвращающая компонент высшего порядка
import withImage from "./components/withImage_HOC"; 

const text = `Композиция позволяет делать все тоже самое, 
              что и наследование, но при этом нет повторения кода.
              В наследуемом модальном окне всю разметку пришлось писать заново.
              В композиции мы просто обернули компонент, выводящий изображение, 
              в базовое модальное окно ( === передали в качестве props.children). 
              Композиция интуитивно понятна - мы сразу видим, какой компонент лежит внутри какого.`;

//******************************HOC**********************************************************
// Пример использования компонента высшего порядка (higher-order component, HOC)
//для получения улучшенного компонента

/* Передаем функции withImage
   - оборачиваемый компонент, 
   - адрес источника изображений 
   - коллбэк для извлечения src
 */
const ModalWithRandomUserImage = withImage(Modal, "https://randomuser.me/api",(data)=>data?.results[0]);

//*****************************************************************************************

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      ModalRUInheritVisible: false,
      RUCompVisible: false,
      HOCisVisible: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  render() {
    const { modalVisible, ModalRUInheritVisible, RUCompVisible, HOCisVisible } = this.state;
    return (
      <div className="App">
        <AppBar position="static">
          <Typography variant="h5">
            t8, задание 5: композиция против наследования
          </Typography>
        </AppBar>
        <Typography>{text}</Typography>
        {/**************************** Простое модальное окно**************************************/}
        <Display
          isVisible={modalVisible}
          openHandler={() => this.showModal("modalVisible")}
          buttonText="Показать простое модальное окно"
        >
          <Modal closeHandler={() => this.closeModal("modalVisible")}>
            {<h2>Простое модальное окно</h2>}
          </Modal>
        </Display>

        {/**************************** Наследование**************************************/}
        <Display
          isVisible={ModalRUInheritVisible}
          openHandler={() => this.showModal("ModalRUInheritVisible")}
          buttonText="Показать случайного пользователя (наследование) "
        >
          {/* Наследование: просто вызываем компонент*/}
          <ModalRandomUserInherit
            closeHandler={() => this.closeModal("ModalRUInheritVisible")}
          >
            {<h2>Наследуемое модальное окно</h2>}
          </ModalRandomUserInherit>
        </Display>

        {/**************************** Композиция**************************************/}
        <Display
          isVisible={RUCompVisible}
          openHandler={() => this.showModal("RUCompVisible")}
          buttonText="Показать случайного пользователя (композиция) "
        >
          {/* Композиция: оборачиваем один компонент другим (передача в props.children)*/}
          <Modal closeHandler={() => this.closeModal("RUCompVisible")}>
            {
              <RandomUserComp>
                <h2>Композиционное модальное окно</h2>
              </RandomUserComp>
            }
          </Modal>
        </Display>
        {/**************************** Компонент высшего порядка (HOC)**************************************/}
        <Typography>Higher-order component (HOC) -  функция, принимающая в качестве аргумента другой компонент и
        делающая с этим компонентом что-то. Часто это передача пропсов.</Typography>

        <Display
          isVisible={HOCisVisible}
          openHandler={() => this.showModal("HOCisVisible")}
          buttonText="Показать случайного пользователя (HOC) "
        >
          {/* Компонент высшего порядка, полученный из Modal*/}
          <ModalWithRandomUserImage
            closeHandler={() => this.closeModal("HOCisVisible")}
          >
            {/*<h2>Модальное окно - компонент высшего порядка</h2>*/}
          </ModalWithRandomUserImage>
        </Display>
      </div>
    );
  }

  showModal(type) {
    this.setState((prevState) => ({ [type]: true }));
  }
  closeModal(type) {
    this.setState((prevState) => ({ [type]: false }));
  }
}
export default App;
