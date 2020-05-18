import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EventsTable from "./eventsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getEvents, deleteEvent, getNewEvents } from "../services/eventService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Events extends Component {
  state = {
    events: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "event_serial", order: "desc" }
  };

  async componentDidMount() {
    const { data: events } = await getEvents();
    console.log(events);
    this.setState({ events });
    setInterval(() => this.getEventUpdateFromDatabase(), 6000);
  }

  handleDelete = async event => {
    const originalEvents = this.state.events;
    const events = originalEvents.filter(m => m._id !== event._id);
    this.setState({ events });

    try {
      await deleteEvent(event._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This event has already been deleted.");

      this.setState({ events: originalEvents });
    }
  };

  handleLike = event => {
    // const events = [...this.state.events];
    // const index = events.indexOf(event);
    // events[index] = { ...events[index] };
    // events[index].liked = !events[index].liked;
    // this.setState({ events });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    // To be implemented
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      events: allEvents
    } = this.state;

    let filtered = allEvents;
    if (searchQuery)
      filtered = allEvents.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const events = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: events };
  };

  getEventUpdateFromDatabase =  async () => {
    // Get current max event serial #
    const events = [...this.state.events]
    const last = _.last(events);

    try {    
      const { data: result } = await getNewEvents(last.event_serial);
      if (result.length === 0)
      {
        console.log('No new EVENT data available in Database !');
        // toast.info("No New EVENT data available in Database !");
        return
      }
      
      console.log('Response from Server: ', result);
      const updatedEvents = events.concat(result);
      console.log(updatedEvents);
      toast.warn("A New Event has been encountered !");
      this.setState({ events: updatedEvents });
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
      //   toast.error("This event has already been deleted.");

      // this.setState({ events: originalEvents });
    }

    // Send it to backend alongwith the get request
    // In backend, handle to only fetch the updated events prior the previous update
    // Render the updated events list
    // Fire this method at regular intervels.

    //const events = [...this.state.events];
    
  };
  

  render() {
    const { length: count } = this.state.events;
    if (count === 0) return <p>There are no events in the database.</p>;

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    const { totalCount, data: events } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
        <video width="720" autoplay controls muted autoPictureInPicture="true" loop>
          <source src="http://192.168.10.11:3900/Brendon.mp4" type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </div>
        <div className="col">
          <p>Showing {totalCount} events in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <EventsTable
            events={events}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Events;
