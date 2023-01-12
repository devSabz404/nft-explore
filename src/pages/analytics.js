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

import { Collapse } from "antd";
import Transactions from "../components/transactions";
import Bought from "../components/bought";
import Assets from "./assets";
import Sold from "../components/sold";
import Engagements from "../components/engagements";

const { Panel } = Collapse;

function Analytics() {

  return (
    <>
      <Collapse accordion>
        <Panel header="Assets Owned" key="1">
          <Assets />
        </Panel>
        <Panel header="Transactions" key="2">
          <Transactions />
        </Panel>
        <Panel header="Sold" key="3">
          <Sold />
        </Panel>
        {/* <Panel header="Bought" key="4">
          <Bought />
        </Panel> */}
        <Panel header="Engagements" key="5">
          {/* <Engagements /> */}
        </Panel>
      </Collapse>
    </>
  );
}

export default Analytics;