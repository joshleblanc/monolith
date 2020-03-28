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
  render() {
    return(
      <ItemsTable
        TableConfig={TableConfig}
        title="Latest Items"
      />
    )
  }
}