import "antd/dist/antd.css";
import { Button, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
function App() {
  const address = useSelector((state) => state.wallet);

  const fetchTransactions = async () => {
    const res = await axios.post(`${API_URL}/nfts/transactions`, { address });
    return res.data;
  };

  const tnxQuery = useQuery("txns", fetchTransactions);

  let data = null;

  if (tnxQuery.status === "success") {
    data = tnxQuery.data.transfers;
  }

  const columns = [
    {
      title: "Value",
      dataIndex: "value",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.value.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "From",
      dataIndex: "from",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.from === value;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.to.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
  const headers = [
    { label: "Value", key: "value" },
    { label: "From", key: "from" },
    { label: "To", key: "to" },
  ];

  if (address === null || address === undefined)
    return <div>Connect Wallet</div>;
  return (
    <div className="App">
      <header className="App-header">
        {!data  ? null : (
          <CSVLink data={data} headers={headers}>
            Export CSV
          </CSVLink>
        )}

        {tnxQuery.status === "error" && <p>Error Fetching data</p>}
        {tnxQuery.status === "loading" && <p>Fetching data...</p>}
        {tnxQuery.status === "success" && (
          <Table
            style={{ display: "flex", flex: 1, margin: 10 }}
            columns={columns}
            dataSource={data}
          ></Table>
        )}
      </header>
    </div>
  );
}

export default App;
