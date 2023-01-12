import { Tabs } from 'antd';
import React from 'react';
import LikesMap from './likes';
import SalesMap from './likes';
import ViewsMap from './likes';

export default function Allmaps({owner}){
    return(

        <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Sales" key="1">
          <SalesMap owner={owner}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Views" key="2">
          <ViewsMap owner={owner}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Likes" key="3">
          <LikesMap owner={owner}/>
        </Tabs.TabPane>
      </Tabs>

    )

}

