import "antd/dist/antd.css";

import { Button, Input, Table } from "antd";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
function App() {
  const owner = useSelector((state) => state.wallet);

  const fetchAssets = async () => {
    const res = await axios.post(`${API_URL}/nfts/getassets`, { owner });
    return res.data;
  };

  const assetsQuery = useQuery("assets", fetchAssets);

  let data = null;
  let newArray = [];

  if (assetsQuery.status === "success") {
    data = assetsQuery.data.ownedNfts;

    for (let i = 0; i < data.length; i++) {
      newArray.push({
        key: i,
        name: data[i].title,
        collection: data.description,
        price: data[i].metadata.price,
        image: data[i].metadata.image,
        time: data[i].timeLastUpdated,
      });
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Price",
      dataIndex: "price",
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
        return record.rice == value;
      },
    },
    {
      title: "Date Created",
      dataIndex: "time",
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
        return record.time.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Preview",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record.image}
            alt="preview"
            style={{ width: "80px", height: "60px" }}
          />
        );
      },
    },
  ];
  const headers = [
    { label: "Name", key: "name" },
    { label: "Collection", key: "collection" },
    { label: "Price", key: "price" },
    { label: "Created", key: "time" },
  ];
  console.log("these are assets",data)
  if (owner === null || owner === undefined) return <div>Connect Wallet</div>;
  return (
    <div className="App">
      {data === undefined || data === null? null : (
          <CSVLink data={data} headers={headers}>
            Export CSV
          </CSVLink>
        )}
      {assetsQuery.status === "error" && <p>Error Fetching data</p>}
      {assetsQuery.status === "loading" && <p>Fetching data...</p>}

      <header className="App-header">
        {assetsQuery.status === "success" && (
          <Table
            style={{ display: "flex", flex: 1, margin: 10 }}
            columns={columns}
            dataSource={newArray}
          ></Table>
        )}
      </header>
    </div>
  );
}

export default App;
