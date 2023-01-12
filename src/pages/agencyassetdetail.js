import { Card } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from  "axios"
const { Meta } = Card;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function AssetDetail(){
    const {id} = useParams()

    async function getDetail(){
        let res = await axios.post(`${API_ENDPOINT}/api/querynft`,{id})
        return res;
        }

        const detailQuery = useQuery("detail",getDetail);
        let qresult = null
        if(detailQuery.status==="success"){
          qresult = detailQuery.data
        }
        console.log(qresult)

    
    console.log(id);
  
            return(
                <div>
                 {detailQuery.status==="Error"&&<p>Error</p>}
                 {detailQuery.status==="Loading"&&<p>Loading</p>}
                 {detailQuery.status==="success"&&   
                <Card
                hoverable
                style={{
                  width: 400,
                  marginLeft:250
               
                }}
        
                cover={<img alt="asset-detail" src={qresult.data[0].fileUrl} />}
        
              >
                  <Meta title={qresult.data[0].titles} description={qresult.data[0].desc} />
                  <h4>MATIC {qresult.data[0].strPrice} </h4>
               
              </Card>}
            </div>

            )
        };
export default AssetDetail;