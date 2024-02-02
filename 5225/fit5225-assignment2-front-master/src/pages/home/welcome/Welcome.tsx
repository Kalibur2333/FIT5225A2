import React from 'react';
import { Typography, Divider, Image } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Welcome() {
  const fontSize = {
    fontSize: '17px',
  };
  return (
    <Typography>
      <Title>Object detection and image searching system</Title>
      <Divider orientation="left">Upload Picture</Divider>
      <Image src="https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/07/24011215/2-1.png" />
      <Paragraph style={fontSize}>
        Object detection and image searching system is a system that can provide
        yolo3-based image recognition and search functions.
      </Paragraph>
      <Paragraph style={fontSize}>
        In our system, you can upload an image for the machine to perform object
        detection, our system will identifies the class of object (person,
        table, chair, etc.) in the image and tag the image by these identified
        classes, you can know the tags the image is labeled with.
      </Paragraph>
      <Paragraph style={fontSize}>
        <Text strong>
          Privacy Warning: The image upload for object detection would be stored
          in our system. Please make sure not upload images with private
          information or images that you may not willing to be stored in our
          system.
        </Text>
      </Paragraph>
      <Divider orientation="left">Search Picture</Divider>
      <Paragraph style={fontSize}>
        Our system also provide image search service. You can provide several
        tags and our system will find for you pictures that contain all the tags
        you provide.
      </Paragraph>
      <Image src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2020/11/facebook_reverse_image_search.png?w=690&ssl=1" />
      <Paragraph style={fontSize}>
        You can also choose to upload an image, our system will first detect the
        objects in your image and then find you images that contain all the
        identified tags in this image. Which is somehow similar to the Google
        search by image
      </Paragraph>
      <Paragraph style={fontSize}>
        <Text strong>
          Attention: Pictures used to find other similar pictures will not be
          stored in our database, you can upload pictures with confidence.
        </Text>
      </Paragraph>
    </Typography>
  );
}
