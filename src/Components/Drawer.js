import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentValue } from "../Features/EditorSlice";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const jsonData = [
  {
    name: "container-node",
    nodeId: 1,
    label: "Collection 1",
    leaf: [
      {
        nodeId: 1.1,
        label: `Collection 1.1.1`,
      },
    ],
  },
];

const Drawer = ({ handleDrawerClick, isDrawerOpen }) => {
  const [currentActive, setCurrentActive] = useState("Documents");
  const [allData, setAllData] = useState(jsonData);

  const selectedData = useSelector(selectCurrentValue);
  console.log(selectedData);

  const handleCurrentFile = (current) => {
    const currentFile = current.target.innerHTML;
    setCurrentActive(currentFile);
  };

  const lastElementId = allData[allData.length - 1].nodeId;
  const lastLeafId = allData[allData.length - 1].leaf.map(
    (value) => value.nodeId
  );

  const insertThisData = {
    name: "container-node",
    nodeId: lastElementId + 1,
    label: `Collection ${lastElementId + 1}`,
    leaf: [
      {
        nodeId: parseFloat(lastLeafId) + 1,
        label: "New Collection",
      },
    ],
  };

  const handleAddNewCollection = () => {
    setAllData(allData.push(insertThisData));
  };

  const collapseDrawer = isDrawerOpen ? "drawer-open" : "drawer-collapse";

  return (
    <div className={`drawer-custom-styles bg-light ${collapseDrawer}`}>
      <div className="row shadow mb-2">
        <button className="btn shadow-none col col-4">DFIN</button>
        <div className="col col-8 d-flex justify-content-end">
          <button className="btn shadow-none" onClick={handleAddNewCollection}>
            <i className="fa fa-plus"></i>
          </button>
          <button className="btn shadow-none">
            <i className="fa fa-expand"></i>
          </button>
          <button className="btn shadow-none" onClick={handleDrawerClick}>
            <i className="fa fa-angle-double-left"></i>
          </button>
        </div>
      </div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 850, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
      >
        <TreeItem nodeId="0" label="All Documents">
          {allData.map((value, idx) => (
            <TreeItem
              nodeId={value.nodeId.toString()}
              label={value.label}
              collapseIcon={<ExpandMoreIcon />}
              endIcon={<i className="fa fa-plus"></i>}
              key={value.nodeId}
            >
              {value.leaf.map((leafValue, idx) => (
                <TreeItem
                  nodeId={parseFloat(leafValue.nodeId).toString()}
                  label={leafValue.label}
                  onClick={handleCurrentFile}
                  key={leafValue.nodeId}
                ></TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Drawer;
