import TopPerfomers from "../components/analysis/topperfomers";
import AgencyAssets from "../components/analysis/agencyassets";
import Allmaps from "../components/analysis/map/allmaps";

import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const owner = localStorage.getItem("walletaddress");

const API_URL = process.env.REACT_APP_API_ENDPOINT;

console.log("this is url",API_URL)





function Home() {
  const id = useSelector(state=>state.user._id)
  async function agencyViews() {
    let res = await axios.post(`${API_URL}/stats/mycreatorviews`, { id });
    return res.data;
  }
  async function agencyLikes() {
    let res = await axios.post(`${API_URL}/stats/mycreatorlikes`, { id });
    return res.data;
  }
  async function agencySales() {
    let res = await axios.post(`${API_URL}/stats/agencyvalue`, { id });
    return res.data;
  }
  async function agencyCreators() {
    let res = await axios.post(`${API_URL}/stats/mycreators`, { id });
    return res.data;
  }

  const viewsQuery = useQuery("likes", agencyViews);
  let viewsData = "0";
  if (viewsQuery.status === "success") {
    viewsData = viewsQuery.data;
  }

  const salesQuery = useQuery("agencysales", agencySales);
  let salesData = "0";
  if (salesQuery.status === "success") {
    salesData = salesQuery.data;
  }

  const creatorsQuery = useQuery("agencycreators", agencyCreators);
  let creatorsData = "0";
  if (creatorsQuery.status === "success") {
    creatorsData = creatorsQuery.data;
  }

  const likesQuery = useQuery("agencylikes", agencyLikes);
  let likesData = "0";
  if (likesQuery.status === "success") {
    likesData = likesQuery.data;
  }

  return (
    <>
      <div style={{ padding: "30px" }} className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Sales"
                value={`${salesData} MATIC`}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Views"
                value={viewsData}
                //precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowUpOutlined />}
                //suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Creators"
                value={creatorsData}
                //precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                //suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Favourites"
                value={likesData}
                // precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                //suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <h3>Top Perfomers</h3>
              <TopPerfomers />
            </Card>
          </Col>
        </Row>

      
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={true} className="criclebox h-full">
              <h3>Global Analytics</h3>
              <Allmaps owner={owner} />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <h3>Agency Assets</h3>
              <AgencyAssets />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}></Row>
      </div>
    </>
  );
}

export default Home;
