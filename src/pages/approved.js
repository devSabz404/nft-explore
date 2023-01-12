import { Descriptions, Card,Button,Alert } from "antd";
import { useQuery } from "react-query"; 
import React from "react";
import axios from "axios";
import { useState } from "react";

const Alerts = () => <Alert message="Success " type="success" />;
const AlertF = () => <Alert message="Failed" type="erro" />;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function  Approved(){
    const [ success,setSuccess] = useState(false);
    const [ fail,setFail] = useState(false);
    

    const getArtists = async () => {
    let query = await axios.get(`${API_ENDPOINT}/artist/artist-approved`);
    return query.data;

    }

    const artistQuery = useQuery("artist",getArtists);
    let artists = null
    if(artistQuery.status === "success"){
        artists = artistQuery.data;
    };

    console.log(artists);

 


    return(
        <>
        {success?<Alerts/>:null}
        {fail?<AlertF/>:null}
        {artistQuery.status==="loading"&& <p>Loading...</p>}
        {artistQuery.status==="error"&& <p>Error Fetching Data...</p>}
        {artistQuery.status==="success"&& 
        artistQuery.data.map((item)=>
        <Card title={item.user_name}  style={{ width: 800 }}>
          <Descriptions title="Details">
            <Descriptions.Item label="Phone">{item.user_phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{item.user_email}</Descriptions.Item>
            <Descriptions.Item label="LinkedIn">{item.user_linkedin}</Descriptions.Item>
            <Descriptions.Item label="Art Type">{
                item.artType.map((art,i)=><ul>
                    <li key={i}>{art}</li>
                </ul>)
            }</Descriptions.Item>
            
         
          </Descriptions>

          <Descriptions title="Portfolios">
            <Descriptions.Item ><a href={item.user_port}>{item.user_port}</a></Descriptions.Item>
            <Descriptions.Item ><a href={item.user_port1}>{item.user_port1}</a></Descriptions.Item>
          
             
             
            
         
           
           
            
         
          </Descriptions>
          
        </Card>)}
        </>
        )

}

  


export default Approved;
