import React, { useState } from 'react';
import { Button, PageHeader, message, Carousel, Row, Col, Image } from 'antd';
import DynamicForm from '@/components/uploadTag/DynamicForm';
import ResultList from '@/components/detect/ResultList';

const success = () => {
  message.success('This is a success message');
};

const contentStyle = {
  height: 'auto',
  width: '400px',
};

export default function UploadTag() {
  const [current, setCurrent] = useState(0);
  const [resultURL, setResultURL] = useState([]);
  const [base64, setBase64] = useState([]);

  // set the current, destroy the upload elements, display the result elements
  // param:msg a callback could get the data inside the form
  const callback = (msg: any) => {
    console.log(msg);
    success();
    setCurrent(current + 1);

    let newResultURL: string[] = [];
    let newImage: string[] = [];
    msg.map((record: any) => {
      newResultURL.push(record.url);
      newImage.push('data:image/jpeg;base64,' + record.image);
    });
    setResultURL(newResultURL);
    setBase64(newImage);
  };

  const uploadAnother = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Search by Tag"
        subTitle="Find images that contain all given tags"
      />

      {current === 0 && (
        <div style={{ marginTop: '40px' }}>
          <DynamicForm callback={callback} />
        </div>
      )}
      {current === 1 && (
        <div>
          <Row>
            <Col span={12}>
              <Carousel autoplay dotPosition="top">
                {base64.map((item) => {
                  return (
                    <div key={resultURL.indexOf(item)}>
                      <Image style={contentStyle} width={400} src={item} />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            <Col span={12}>
              <ResultList data={resultURL} />
            </Col>
          </Row>
          <Button type="primary" onClick={uploadAnother}>
            Upload other tags
          </Button>
        </div>
      )}
    </div>
  );
}
