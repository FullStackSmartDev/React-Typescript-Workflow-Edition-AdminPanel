// React imports
import React, { Fragment } from "react";
import "./FrxImageCell.scss";
interface FrxImageCellProps {
  data?: any;
  title?: any;
  img?: any;
}

interface FrxImageCellState {}

class FrxImageCell extends React.Component<
  FrxImageCellProps,
  FrxImageCellState
> {
  render() {
    console.log(this.props.data);

    // let { user, user_img } = this.props.data ? this.props.data.children.props.dataRow : { user: '', user_img: '' }
    return (
      <Fragment>
        <img
          src={
            this.props.img ? this.props.img : "https://via.placeholder.com/20"
          }
          alt={"image"}
        />
        {/* {this.props.data ? this.props.data : "Mock data"} */}
      </Fragment>
    );
  }
}

export default FrxImageCell;
