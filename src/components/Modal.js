import React, { PureComponent } from "react";
import "./css/Modal.css";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
export default class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  render() {
    const { children, open } = this.props;
    return (
      <Box open={open} className="modal" data-closer onClick={this.closeModal}>
        <div className="inner">
          <IconButton
            className="close"
            data-closer
            onClick={this.closeModal}
            sx={{ position: "absolute", top: 10, right: 10}}
          >
            <CloseIcon data-closer/>
          </IconButton>
          {children}
        </div>
      </Box>
    );
  }

  // Если клик был по элементу с аттрибутом data-closer - закрываем модальное окно
  //  e.target.tagName === "path" - костыль для material UI
  closeModal(e) {
    console.log(e.target.tagName)
    if (e.target.dataset.closer || e.target.tagName === "path") {
      this.props.closeHandler();
    }
  }
}
