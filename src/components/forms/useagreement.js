import { Button, message, Steps } from 'antd';
import React, { useState } from 'react';
const { Step } = Steps;
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const App = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default App;




// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import axios from "axios"
// import Terms from "../modal/terms";
// import { Form, Input, Button, Card } from "antd";
// const API_URL = process.env.REACT_APP_API_ENDPOINT;
// const UserAgreement = () => {
//   const [formInput, setFormInput] = useState({
//     first_name: "",
//     lasr_name: "",
//     company: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleSubmit= async (e)=>{
//     const {first_name,last_name,company,email,phone,password} = formInput
//     const data = {first_name,last_name,company,email,phone,password}
//     e.preventDefault()
//     await axios.post(`${API_URL}/auth/register`,data)
//     .then(()=>{
//         window.location.replace('./sign-in')
//     })
//     .catch((err)=>{
//         alert('Something went wrong')
//     })

//   }

//   return (
//     <>
//       <Card title="User Agreement">
//         <Card type="inner" title="Service terms">
//           Deliverables:{"Deliverables goes here"}
//           <br />
//           Vip waiver:{"Off"}
//           <br />
//           Revenue share:{"5%"}
//         </Card>
//       </Card>

//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//       >
//         <Form.Item label="First Name">
//           <Input
//           onChange={(e)=>{
//             setFormInput({...formInput,first_name:e.target.value})
//           }}
//            />
//         </Form.Item>
//         <Form.Item label="Last Name">
//           <Input
//            onChange={(e)=>{
//             setFormInput({...formInput,last_name:e.target.value})
//           }}
//            />
//         </Form.Item>
//         <Form.Item label="Company">
//           <Input
//            onChange={(e)=>{
//             setFormInput({...formInput,company:e.target.value})
//           }}
//            />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input
//            onChange={(e)=>{
//             setFormInput({...formInput,email:e.target.value})
//           }}
//            />
//         </Form.Item>
//         <Form.Item label="Phone">
//           <Input 
//            onChange={(e)=>{
//             setFormInput({...formInput,phone:e.target.value})
//           }}/>
//         </Form.Item>
      
//         <Form.Item label="Password">
//           <Input.Password placeholder="input password" />
//           <Input.Password
//            onChange={(e)=>{
//             setFormInput({...formInput,password:e.target.value})
//           }}
//             placeholder="input password"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//         </Form.Item>

//         <Form.Item label="Accept Terms & Conditions">
//           <Terms />
//         </Form.Item>

//         <Form.Item label="Sign">
//           <Button
//           onClick={handleSubmit}
//           >Agree</Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default UserAgreement;
