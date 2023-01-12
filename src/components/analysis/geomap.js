import React,{useState,useEffect} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import {  Card,Button } from "antd";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
export default function Geomap() {

    const [geoData, setGeoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openviews, setOpenviews] = useState(false);
    const [openlikes, setOpenlikes] = useState(false);
    const [opensold, setOpensold] = useState(false);
    
    
    // Function to render views 
    let viewsArray = [];
    let count = {}
    let result =null
    let datas = [["Country", "Views"],];
    function displayViews(data){
        if(data.length > 0){
            for(let i =0; i < data.length; i++){
                if(data[i].viewed===true){
                    viewsArray.push([data[i].country,data[i].viewed]);

                }else{
                    viewsArray=[];
                }
        }
        for(let i =0; i < viewsArray.length; i++){
            count[viewsArray[i][0]] = (count[viewsArray[i][0]] || 0) + 1;
        }
        result = Object.keys(count).map(function(key) {
            return [key, count[key]];
        });
        for(let i =0; i < result.length; i++){
            datas.push(result[i]);
        }
       
      
    }}

        // Function to render sold items 
        let soldArray = [];
        let soldCount = {}
        let soldResult =null
        let soldDatas = [["Country", "Assets Sold"],];
        function displaySold(data){
            if(data.length > 0){
                for(let i =0; i < data.length; i++){
                    if(data[i].bought===true){
                        soldArray.push([data[i].country,data[i].bought]);
    
                    }else{
                        soldArray=[];
                    }
            }
            for(let i =0; i < soldArray.length; i++){
                soldCount[soldArray[i][0]] = (soldCount[soldArray[i][0]] || 0) + 1;
            }
            soldResult = Object.keys(soldCount).map(function(key) {
                return [key, soldCount[key]];
            });
            for(let i =0; i < soldResult.length; i++){
                soldDatas.push(result[i]);
            }
           
          
        }}

          // Function to render likes
          let likesArray = [];
          let likesCount = {}
          let likesResult =null
          let likesDatas = [["Country", "Assets Sold"],];
          function displayLikes(data){
              if(data.length > 0){
                  for(let i =0; i < data.length; i++){
                      if(data[i].liked===true){
                          likesArray.push([data[i].country,data[i].bought]);
      
                      }else{
                          likesArray=[];
                      }
              }
              for(let i =0; i < likesArray.length; i++){
                  likesCount[likesArray[i][0]] = (likesCount[likesArray[i][0]] || 0) + 1;
              }
              likesResult = Object.keys(likesCount).map(function(key) {
                  return [key, likesCount[key]];
              });
              for(let i =0; i < likesResult.length; i++){
                  likesDatas.push(result[i]);
              }
             
            
          }}

  
   
    const defaultV =[["Country", "Assets Sold"]];
     
    displayViews(geoData);
    displayLikes(geoData);
    displaySold(geoData);
    //const mresult = data.reduce((a, b) => a + b[1], 0); 

    async function asyncFetch() {
        await axios.get(`${API_URL}/api/getgeodata`)
        .then((response) => {
            setGeoData(response.data);
            setLoading(false);
            console.log('location', response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    useEffect(() => {
        asyncFetch();
        return () => {
            setGeoData([]); // This worked for me
          };

    } , []);

    if(loading){
        return <div>Loading...</div>
    }
    else{

        return (
            <>
             <Card
              bordered={false}
              className="criclebox tablespace mb-24"             
              extra={
                <>
                  
                    <Button onClick={()=>openviews===false?setOpenviews(true):setOpenviews(false)} >Views</Button>
                    <Button onClick={()=>openlikes===false?setOpenlikes(true):setOpenlikes(false)} >Likes</Button>
                    <Button onClick={()=>opensold===false?setOpensold(true):setOpensold(true)} >Sales</Button>
                  
                </>
              }
            >
             {openviews?
                <Chart
          
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={datas}
              />
              :openlikes?
              <Chart
          
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={likesDatas}
            />
            :opensold?
            <Chart
          
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={likesDatas}
          />
          :
          <Chart
          
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={defaultV}
        />


             }   
            
            </Card>
            </>
          );

    }

}
