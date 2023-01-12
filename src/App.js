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
import { Switch, Route, Redirect,BrowserRouter } from "react-router-dom";
import Home from "./pages/analytics";
import Detail from "./pages/detail"
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PendingUsers from "./pages/pendingusers";
import UserProfile from "./pages/userprofile";
import AllUsers from "./pages/allusers";
import Main from "./components/layout/Main";
import Assets from "./pages/assets";
import Creators from "./pages/creators";
import Collection from "./pages/collection";
import Collections from "./pages/collections";
import Analytics from "./pages/Home";
import Createuser from "./pages/createuser";
import AgencyCreators from "./pages/agencycreators";
import CreatorAccount from "./pages/creatoraccount";
import Myprofile from "./pages/myprofile";
import EditForm from "./pages/edit";
import UserAgreement from "./pages/useragreement";
import PendingInvites from "./pages/pendinginvites";
import CreatorAnalytics from "./pages/creatoranalytics";
import Agreement from "./pages/agreement";
import SetPassword from "./pages/Setpass";
import AddUser from "./pages/adduser";
import Curation from "./pages/curation" 
import Approved from "./pages/approved";
import DataTest from "./pages/datatest";
import Maps from "./pages/map";
import AssetDetail from "./pages/agencyassetdetail";
import TxnHistory from "./pages/txnhistory";



import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <div className="App">
      <Route exact path="/(sign-in)" component={LoginContainer}/>
      <Route component={DefaultContainer}/>
  
    </div>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
const LoginContainer = () =>(
  <div>
     <Route exact path="/" render={() => <Redirect to="/sign-in" />} />
     <Route path ="/user-agreement" exact component={UserAgreement}/>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/register" exact component={SetPassword} />
  </div>
)

const DefaultContainer = ()=>(
  <div>
       <Main>
          <Route exact path="/dashboard" component={Home} />
       
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/dtest" component={DataTest} />
          <Route exact path="/approved" component={Approved} />
          <Route exact path="/curation" component={Curation} />
          <Route exact path="/adduser" component={AddUser} />
          <Route exact path="/agreement/:id" component={Agreement} />
          <Route exact path="/asset-detail/:id" component={AssetDetail} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/transactionhistroy/:id" component={TxnHistory} />
          <Route exact path="/creatoranalytics" component={CreatorAnalytics} />
          <Route exact path="/creators" component={Creators} />
          <Route exact path="/assets" component={Assets} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route  path="/userprofile/:id" component={UserProfile} />
          <Route exact path="/Pendingusers" component={PendingUsers} />
          <Route exact path="/allusers" component={AllUsers} />
          <Route path="/collection/:id" component={Collection} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/createuser" component={Createuser} />
          <Route exact path="/agencycreators" component={AgencyCreators} />
          <Route exact path="/creatoraccount/:id" component={CreatorAccount} />
          <Route exact path="/myprofile" component={Myprofile} />
          <Route exact path="/edit" component={EditForm} />
          <Route exact path="/pendinginvites" component={PendingInvites} />
          
          {/* <Route exact path="/" component={SignIn} /> */}
          {/* <Redirect from="*" to="/analytics" /> */}

          {/* admin */}
          
        </Main>

  </div>
)
