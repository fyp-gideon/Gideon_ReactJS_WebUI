import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Image from "./common/image";

class EventsTable extends Component {
  columns = [
    {
      path: "event_serial",
      label: "Event #",
      // content: event => <Link to={`/events/${event._id}`}>{event.title}</Link>
    },
    { path: "event_label", label: "Event Label" },
    { path: "date_time", label: "Timestamp" },
    { path: "normal_probability", label: "Normal Probability" },
    { path: "abnormal_probability", label: "Abnormal Probability" },
    // { path: "image_url", label: "Event Image" },
    //{ path: "clip_url", label: "Event Footage" },
    {
      key: "like",
      img_src: "image_url",
      label: "Event Image",
      // content: event => (
      //   <Like source={this.image_url} liked={event.liked} onClick={() => this.props.onLike(event)} />
      // )
    },
    {
      key: "like",
      clip_src: "clip_url",
      label: "Event Footage",
      // content: event => (
      //   <Like source={this.image_url} liked={event.liked} onClick={() => this.props.onLike(event)} />
      // )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: event => (
      <button
        onClick={() => this.props.onDelete(event)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { events, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={events}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default EventsTable;
