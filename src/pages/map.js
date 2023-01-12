import { Chart } from "react-google-charts";
import axios from "axios";
import { useQuery } from "react-query";
import Allmaps from "../components/analysis/map/allmaps";


const API_URL = process.env.REACT_APP_API_ENDPOINT;
export default function Maps() {
 
    const owner = "0xa18c87b9C4558C3e21481CB76eFaa4d491440778";
  const getLocation = async () => {
    let res = await axios.post(`${API_URL}/stats/geolikes`,{owner});
    return res.data;
  };
  const locationQuery = useQuery("txns", getLocation);
  const views = [["Country", "Likes"]];
  if (locationQuery.status === "success") {
    console.log("from server", locationQuery.data);
    let myviews = locationQuery.data;

    for (let i = 0; i < myviews.length; i++) {
      views.push(myviews[i]);
    }
    console.log(views);
  }

  return (
    <div>
        <Allmaps/>
      {/* {locationQuery.status === "error" && <p>Error Fetching data</p>}
      {locationQuery.status === "loading" && <p>etching data</p>}
      {locationQuery.status === "success" && (
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = views[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={views}
        />
      )} */}
    </div>
  );
}
