import React, { useState } from "react";

import { Button, Card, Form, Input, Select, Checkbox, Modal } from "antd";
import Contract from "../components/contract.js/contract";
import CreatorContract from "../components/contract.js/creatorcontract";
import PaymentForm from "../components/forms/paymentform";
import CreatorPayment from "../components/forms/creatorpayment";
import { useDispatch } from "react-redux";
import { setBiz, setFname, setInviteEmail } from "../core/dataSlice";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
const { Option } = Select;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


// Create Document Component
export function MyDocument() {
  return <>Hey</>;
}

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [fullname, setName] = useState("");
  const [verified, setVerified] = useState(false);
  const [privacy, setprivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [docSection, setDocSection] = useState(false);
  const [register, setRegister] = useState(false);
  const [agreementDetails, setDetails] = useState();
  const [role, setRole] = useState();
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function handleEmail(e) {
    e.preventDefault();

    await axios
      .post(`${API_ENDPOINT}/userinvite/verify`, { email })
      .then((res) => {
        if (res.data.length > 0) {
          setDetails(res.data);
          setVerified(true);
          setDocSection(true);
          dispatch(setBiz(business));
          dispatch(setFname(fullname));
          dispatch(setInviteEmail(email));
        } else {
          alert("Request  an invite");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  console.log();

  function handlePrivacy() {
    setprivacy(true);
  }
  function handleTerms() {
    setTerms(true);
  }

  return (
    <>
      {verified ? null : (
        <Card title="User Agreement">
          <Form layout="vertical" className="row-col">
            <Form.Item
              className="username"
              label="Full Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please enter your full name!",
                },
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              className="username"
              label="Business"
              name="business"
              onChange={(e) => setBusiness(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please enter your business name!",
                },
              ]}
            >
              <Input placeholder="Business" />
            </Form.Item>
            <Form.Item
              className="username"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              className="role"
              label="Select role"
              name="role"
           
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
               <Select
      placeholder="role"
      style={{
        width: 120,
      }}
      onChange={(e) =>setRole(e.target.value)}
    >
      <Option value="1">Creator</Option>
      <Option value="2">Agency</Option>


    </Select>
              
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "10%", backgroundColor: "#660099" }}
                onClick={handleEmail}
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      {docSection ? (
        <Card title="User Agreement">
          {role==="1"?<CreatorContract details={agreementDetails[0]}/>:<Contract details={agreementDetails[0]} />}
          <Checkbox onChange={handleTerms}>
            Agree to Terms and Conditions ,
            <a href="http://vaultindustria.com/termsandconditions">read</a>
          </Checkbox>
          <br />
          <Checkbox onChange={handlePrivacy}>
            {" "}
            Privacy Policy,{" "}
            <a href=" www.vaultindustria.com/privacypolicy">read</a>
          </Checkbox>
          <br />
          <Button
            disabled={!privacy && !terms}
            type="primary"
            htmlType="submit"
            style={{ width: "10%", backgroundColor: "#660099" }}
            onClick={showModal}
          >
            Subscribe
          </Button>
          <Modal
            title="Account Registration"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Elements stripe={stripePromise}>
              {role==="2"?<PaymentForm />:<CreatorPayment/>}
            </Elements>
          </Modal>
        </Card>
      ) : null}
      {register ? <Card title="Register"></Card> : null}
    </>
  );
}
