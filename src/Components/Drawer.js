import React, { Component } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export default class Drawer extends Component {
  render() {
    return (
      <div
        className={`drawer-custom-styles ${
          this.props.isDrawerOpen ? "drawer-open" : "drawer-collapse"
        }`}
      >
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 850, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
          </TreeItem>
          <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="8" label="index.js" />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="11" label="media">
            <TreeItem nodeId="12" label="OSS" />
            <TreeItem nodeId="13" label="MUI">
              <TreeItem nodeId="14" label="index.js" />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="15" label="pictures">
            <TreeItem nodeId="17" label="OSS" />
            <TreeItem nodeId="16" label="MUI">
              <TreeItem nodeId="18" label="index.js" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      </div>
    );
  }
}
