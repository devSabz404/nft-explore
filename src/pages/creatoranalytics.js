/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import TopAnalytics from "../components/analysis/topanalytics";


import {
  Card,
  Col,
  Row,
  Typography,
 
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import { fetchAssets, fetchBought } from "../core/dataSlice";
import { useParams } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_ENDPOINT;
export default function CreatorAnalytics() {
    const {id} = useParams


  return (
    <>
      <div className="layout-content">
        

        
    
      
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <h3>Top Creators</h3>
            <Card bordered={false} className="criclebox h-full">
              
            </Card>
          </Col>
        </Row>

      

        <Row gutter={[24, 0]}></Row>
      </div>
    </>
  );
}


