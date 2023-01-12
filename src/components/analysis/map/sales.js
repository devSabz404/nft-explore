import { Chart } from "react-google-charts";
import axios from "axios";
import { useQuery } from "react-query";


const API_URL = process.env.REACT_APP_API_ENDPOINT;
export default function SalesMaps({owner}) {
   

  const getLocation = async () => {
    let res = await axios.post(`${API_URL}/stats/geosales`,{owner});
    return res.data;
  };
  const locationQuery = useQuery("txns", getLocation);
  const views = [["Country", "Sales"]];
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
      {locationQuery.status === "error" && <p>Error Fetching data</p>}
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
      )}
    </div>
  );
}
