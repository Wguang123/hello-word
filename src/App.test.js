import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


fetchOssToken = () => {
    // 后端提供的服务，用于向前端传递页面访问 OSS 需要的参数
    API.getOssToken().then((res) => {
        this.setState({
            uploadParams: res.data
        });
    }, (res) => {
        message.error(res.error.ret[0]);
    });
}
customRequest = (option) => {
    const data = this.state.uploadParams;
    const uploadDataSource = data.host;
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
            }
            option.onProgress(e);
        };
    }

    const formData = new FormData();
    if (option.data) {
        Object.keys(option.data).forEach((key) => {
            formData.append(key, option.data[key]);
        });
    }
    /* eslint-disable */
    let key = data.dir + 'spIdentity.xlsx';
    key = key.replace(/^[\/\\]+/, '');

    this.ossUrl = `${data.host}/${key}`;
    formData.append('OSSAccessKeyId', data.accessid);
    formData.append('policy', data.policy);
    formData.append('Signature', data.signature);
    formData.append('key', key);
    formData.append('success_action_status', '200');// 成功后的状态码，默认是204
    formData.append('file', option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };
  /* eslint-disable */
    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34

        console.log('xhr:', xhr);

        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr));
    };


    xhr.open('post', uploadDataSource, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (const h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }

    console.log(`key:${key}`);
    console.log('formData:', formData);

    xhr.send(formData);

    return {
        abort() {
            xhr.abort();
        }
    };
}
renderUploadPanel = () => {
    const props = {
        name: 'file',
        withCredentials: false,
        customRequest: this.customRequest,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                API.uploadSpIdentityXlsx({
                    data: {
                        inputXlsxPath: 'ecpc/spIdentity.xlsx'
                    }
                }).then((res) => {
                    message.success(`${info.file.name} 文件上传成功，请等待解析完成，可以通过搜索查看指定小二是否已补充实名认证。`);
                }, (res) => {
                    message.error(`${info.file.name} 文件上传失败！`);
                });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败！`);
            }
        },
    };
    return (
        <div className="app-tag-upload-panel-wrapper">
          <div className="upload-panel-header">
            导入客服
          </div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          <div className="upload-panel-desc">
            您可以批量导入整理好的模板内容，或者使用<a>官方模板</a>整理后再上传
          </div>
        </div>
    );
};
