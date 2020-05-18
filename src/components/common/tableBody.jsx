import React, { Component } from "react";
import Image from "../common/image";
import Footage from "../common/footage";

import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.img_src){
      const image_url = _.get(item, column.img_src);
      console.log("Source Property", image_url);
      return (<Image source={image_url} />);
      //return column.content(item);
    }

    if (column.clip_src){
      const clip_url = _.get(item, column.clip_src);
      console.log("Source Property", clip_url);
      return (<Footage source={clip_url} />);
      //return column.content(item);
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    // console.log("Data: ", data);
    // console.log("Columns: ", columns);
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
