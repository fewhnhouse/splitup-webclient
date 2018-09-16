import React from "react";
import { Upload, Icon, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const getBase64P = img => {
  const reader = new FileReader();
  const promise = new Promise((res, rej) =>
    reader.addEventListener("load", () => res(reader.result))
  );
  reader.readAsDataURL(img);
  return promise;
};

const ADD_AVATAR = gql`
  mutation AddAvatar($file: Upload!) {
    addAvatar(file: $file) {
      avatar
    }
  }
`;

export default class AvatarUpload extends React.Component {
  state = {
    loading: false,
    file: "",
    imageUrl: ""
  };

  customRequest = async (addAvatar, requestData) => {
    const {
      onError,
      onSuccess,
      file,
    } = requestData;

    const imageUrl = await getBase64P(file);
    this.setState(
      {
        file: imageUrl
      },
      () => {
        addAvatar({ variables: { file } }).then(
          res => {
            onSuccess(res);
          },
          err => {
            onError(err);
          }
        );
      }
    );

    console.log(requestData);

    //while (this.state.file === "") {}
    //We never want to upload using XHR
    return false;
  };

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJPG && isLt2M;
  };

  handleChange = info => {
    console.log("info:", info);
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    else if (info.file.status === "done") {
      // Get this url from response in real world.
    } else if(info.file.status === "error") {
        message.error("Error uploading image.");
    }
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <Mutation mutation={ADD_AVATAR}>
        {(addAvatar, { data }) => (
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={this.beforeUpload}
            customRequest={data => this.customRequest(addAvatar, data)}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        )}
      </Mutation>
    );
  }
}
