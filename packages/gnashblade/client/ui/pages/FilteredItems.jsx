import React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';
import ItemsTable from "../components/ItemsTable/ItemsTable";

const TableConfig = new ReactiveDict({
  search: "",
  page: 0,
  pageSize: 25,
  sort: {
    createdAt: -1
  }
});

@autorun
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, detailType } = this.props.match.params;
    const filter = { type };
    if(detailType) {
      filter["details.type"] = detailType;
    }
    let name = type;
    if(detailType) {
      name += " - " + detailType;
    }
    return(
      <ItemsTable
        title={name}
        TableConfig={TableConfig}
        filter={filter}
      />
    )
  }
}