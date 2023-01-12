import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const ImageCard = ({alt,src,title,by}) => (
  <Card
    hoverable
    style={{
      width: 240,
      
      margin:"auto",
      marginTop:"20px",
    }}
    cover={<img alt={alt} src={src} />}
  >
    <Meta title={title} by={by} />
  </Card>
);

export default ImageCard;