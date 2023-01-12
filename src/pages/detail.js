import { Card } from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
const { Meta } = Card;
function Detail(){
    const {id} = useParams()
    const assets = useSelector((state) => state.collection);
    console.log("this is asset",assets)
    const imgObj = assets[0].filter((item)=>item._id===id);
    console.log("this is id",imgObj);
    return(
        imgObj&&imgObj.map((item)=>{
            return(
                <Card
                hoverable
                style={{
                  width: 400,
                  marginLeft:250
               
                }}
        
                cover={<img alt="asset-detail" src={item.fileUrl} />}
        
              >
                  <Meta title={item.titles} description={item.desc} />
                  <h4>MATIC {item.strPrice} </h4>
               
              </Card>

            )
        
        })
       

    )

};
export default Detail;