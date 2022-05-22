// SETUP
import React, { useState, useEffect, useCallback } from "react";

// UI
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

// SUBCOMPONENTS
import DashboardLayout from "@layouts/DashboardLayout";
import AddressNode from "./AddressNode";
import TransactionsNode from "./TransactionsNode";

// FUNCTIONS
// API
import {
  getNodes,
  getEdges,
  createNode,
  updateNode,
  initializeAddressTransactions,
  getAddressTransactions,
} from "@functions/api";
import { TextIncreaseOutlined } from "@mui/icons-material";

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  address: AddressNode,
  transactions: TransactionsNode,
};

const CONTRACT_ADDRESS = "0xE4762eAcEbDb7585D32079fdcbA5Bb94eb5d76F2";

const Dashboard = ({}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const [initialized, setInitialized] = useState(true);
  const [address, setAddress] = useState("");

  // fetch
  useEffect(() => {
    if (initialized) {
      getAddressTransactions(CONTRACT_ADDRESS).then((res) => {
        let nodeTransactions = {};
        res.data.data.result.forEach((txn) => {
          if (nodeTransactions[txn.nodeid])
            nodeTransactions[txn.nodeid] = [
              ...nodeTransactions[txn.nodeid],
              txn,
            ];
          else nodeTransactions[txn.nodeid] = [txn];
        });

        getNodes().then((_res) => {
          let _nodes = _res.data.data.result.map((node) => {
            const {
              nodeid,
              nodename,
              url,
              description,
              nodeposition,
              nodetype,
              nodelabel,
            } = node;
            return {
              id: `${nodeid}`,
              type: nodetype,
              position: nodeposition,
              sourcePosition: "right",
              targetPosition: "left",
              data: {
                onAddTransactionsNode,
                nodename,
                url,
                description,
                nodelabel,
                balance: res.data.data.balance,
                transactions: nodeTransactions[nodeid],
              },
            };
          });
          setNodes(_nodes);
        });

        getEdges().then((_res) => {
          let _edges = _res.data.data.result.map((edge) => {
            const { id, edgesource, edgetarget, edgelabel } = edge;
            return {
              id: `${id}`,
              source: `${edgesource}`,
              target: `${edgetarget}`,
              sourceHandle: "right",
              targetHandle: "left",
              animated: true,
              label: edgelabel !== null ? edgelabel : "",
              labelStyle: { fontSize: 25, fontWeight: "bold" },
              style: { stroke: "black", strokeWidth: 10 },
            };
          });
          setEdges(_edges);
        });
      });
    }
  }, [initialized]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  const onAddTransactionsNode = (originalNode, selectedTransactions) => {
    const { xPos, yPos, type, data } = originalNode;
    const { nodename, nodelabel, url, description, balance } = data;
    console.log("originalNode", originalNode);
    createNode(
      `${nodename}(2)`,
      url,
      description,
      { x: xPos, y: yPos + 550 },
      type,
      `${nodename}(2)`
    ).then((res) => {
      const {
        nodeid,
        nodelabel,
        nodename,
        nodeposition,
        url,
        nodetype,
        description,
      } = res.data.data.result[0];
      let newNode = {
        id: nodeid,
        type: nodetype,
        position: nodeposition,
        sourcePosition: "right",
        targetPosition: "left",
        data: {
          onAddTransactionsNode,
          nodename,
          url,
          description,
          nodelabel,
          balance,
          transactions: Object.values(selectedTransactions),
        },
      };
      setNodes((nds) => nds.concat(newNode));

      updateNode(
        nodeid,
        Object.keys(selectedTransactions).map((k) => parseInt(k))
      ).then((_res) => {
        let _transactionKeys = Object.keys(selectedTransactions);
        setNodes((nds) =>
          nds.map((nd) => {
            if (nd.id == originalNode.id) {
              // original node
              nd.data = {
                ...nd.data,
                transactions: originalNode.data.transactions.filter((txn) => {
                  return !_transactionKeys.includes(`${txn.id}`);
                }),
              };
            }
            return nd;
          })
        );

        getEdges().then((_res) => {
          let _edges = _res.data.data.result.map((edge) => {
            const { id, edgesource, edgetarget, edgelabel } = edge;
            return {
              id: `${id}`,
              source: `${edgesource}`,
              target: `${edgetarget}`,
              sourceHandle: "right",
              targetHandle: "left",
              animated: true,
              label: edgelabel !== null ? edgelabel : "",
              labelStyle: { fontSize: 25, fontWeight: "bold" },
              style: { stroke: "black", strokeWidth: 10 },
            };
          });
          setEdges(_edges);
        });
      });
    });
  };

  return (
    <DashboardLayout>
      {/* {initialized ? ( */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1}
        fitView
        attributionPosition="bottom-left"
        panOnScroll
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === "address") return "#0041d0";
            if (n.type === "transactions") return "black";
          }}
          nodeColor={(n) => {
            if (n.type === "address") return "blue";
            else if (n.type == "transactions") return "lightblue";
          }}
        />
        <Controls />
      </ReactFlow>
      {/* ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Stack>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Begin by Oversee-ing any address
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter ETH Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => {
                initializeAddressTransactions(
                  "0xE4762eAcEbDb7585D32079fdcbA5Bb94eb5d76F2"
                ).then((res) => {
                  setInitialized(true);
                });
              }}
              aria-label="Menu"
              variant={"contained"}
              sx={{ mt: 1 }}
            >
              Initialize
            </Button>
          </Stack>
        </Box> */}
      {/* )} */}
    </DashboardLayout>
  );
};

export default Dashboard;
