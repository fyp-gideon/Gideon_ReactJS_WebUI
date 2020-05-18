import React from "react";

const Image = props => {
  // let classes = "fa fa-heart";
  // if (!props.liked) classes += "-o";
  console.log('Props at Image Component: ', props);
  return (
    <img
      src={props.source}
      height= "125px"
      alt='Image Caption'
      // onClick={props.onClick}
      // style={{ cursor: "pointer" }}
      // className={classes}
      // aria-hidden="true"
    />
  );
};

export default Image;