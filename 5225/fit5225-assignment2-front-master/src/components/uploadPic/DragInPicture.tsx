import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function DragInPicture(props: any) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { Dragger } = Upload;

  const handleUpload = () => {
    const formData = new FormData();
    const reader = new FileReader();
    fileList.forEach((file) => {
      formData.append('files[]', file.originFileObj as RcFile);
      // @ts-ignore
      reader.readAsDataURL(file);
    });
    setUploading(true);

    let base64image: string = '';
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise<void>(function (resolve, reject) {
      reader.onload = function (e) {
        if (typeof e.target.result === 'string') {
          base64image = e.target.result.split('base64,')[1];
          resolve();
        } else {
          reject();
        }
      };
    }).then(() => {
      console.log('start post');
      let objectDetectionURL: string =
        import.meta.env.VITE_IMAGE_RECOGNITION_URL.toString();
      axios
        .post(
          objectDetectionURL,
          {
            id: uuidv4(),
            image: base64image,
          },
          {
            headers: {
              'content-type': 'text/json',
              Authorization: localStorage.getItem('access-token'),
            },
          },
        )
        .then((res) => {
          console.log(res);
          props.callback(res, base64image);
        })
        .then(() => {
          let newFilelist: any = [];
          setFileList(newFilelist);
          message.success('detect successfully.');
        })
        .catch(() => {
          message.error('detect failed.');
        })
        .finally(() => {
          setUploading(false);
        });
    });
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // Single file
      setFileList([file]);
      // Multiple file
      // setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <div>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Only accept .png/.jpg files</p>
      </Dragger>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </div>
  );
}
