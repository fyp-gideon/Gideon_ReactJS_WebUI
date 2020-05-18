import React from "react";

const Footage = props => {
  console.log('Props at Footage Component: ', props);
  return (
    // <img
    //   src={props.source}
    //   height= "125px"
    //   // onClick={props.onClick}
    //   // style={{ cursor: "pointer" }}
    //   // className={classes}
    //   // aria-hidden="true"
    // />
    <video width="300" autoplay controls muted autoPictureInPicture="true" loop>
          <source src={props.source} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
  );
};

export default Footage;