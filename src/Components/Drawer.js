import React, { Component } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export default class Drawer extends Component {
  constructor() {
    super();
    this.state = { currentActive: "Documents" };
  }
  render() {
    const handleCurrentFile = (current) => {
      const currentFile = current.target.innerHTML;
      this.setState({ currentActive: currentFile });
    };

    const isDrawerOpen = this.props.isDrawerOpen;
    const collapseDrawer = isDrawerOpen ? "drawer-open" : "drawer-collapse";
    // const currentActive = this.state.currentActive;
    // const selectCurrentStyle = "drawer-active-file";

    return (
      <div className={`drawer-custom-styles bg-light ${collapseDrawer}`}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 850, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Documents">
              <TreeItem
                nodeId="3"
                label="React notes.txt"
                onClick={handleCurrentFile}
              ></TreeItem>
              <TreeItem
                nodeId="3.1"
                label="Angular notes.txt"
                onClick={handleCurrentFile}
              ></TreeItem>
            </TreeItem>
            {/* Pictures */}
            <TreeItem nodeId="4" label="Pictures">
              <TreeItem
                nodeId="5"
                label="Cat image.png"
                onClick={handleCurrentFile}
              ></TreeItem>
              <TreeItem
                nodeId="5.1"
                label="Dog image.png"
                onClick={handleCurrentFile}
              ></TreeItem>
            </TreeItem>
            {/* Videos */}
            <TreeItem nodeId="6" label="Videos">
              <TreeItem
                nodeId="6.1"
                label="funny video.mp4"
                onClick={handleCurrentFile}
              ></TreeItem>
              <TreeItem
                nodeId="6.2"
                label="horror.mp4"
                onClick={handleCurrentFile}
              ></TreeItem>
            </TreeItem>
            {/* editor */}
            <TreeItem nodeId="7" label="TextEditor">
              <TreeItem
                nodeId="7.1"
                label="Texteditor"
                onClick={handleCurrentFile}
              ></TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
      </div>
    );
  }
}
