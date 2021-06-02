import { CloseCircleOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import styles from "../styles/webItem.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../axiosConfig";
const baseWebURL = baseURL + "web/";
const webRule = value => {
  return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
    value
  );
};
const success = () => {
  message.success("添加成功，鼠标右键可编辑已添加的网址~");
};
function info() {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "删除提示",
      content: <div>确认要删除网址标签吗？</div>,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
}
export default function WebItem() {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [webInfo, setWebInfo] = useState({
    name: "",
    webURL: "",
    iconURL: "",
  });
  useEffect(() => {
    document.oncontextmenu = function (event) {
      setEdit(!edit);
      return false;
    };
  }, [edit]);
  useEffect(() => {
    axios.get(baseWebURL).then(res => {
      setList(res.data.data);
      setLoading(false);
    });
  }, [loadingSubmit]);

  const deleteWeb = async id => {
    const result = await info();
    if (result) {
      setLoadingSubmit(true);
      axios
        .delete(`${baseWebURL}${id}`)
        .then(res => {
          if (res.status === 200) {
            handleCancel();
          }
        })
        .catch(err => {
          console.dir(err);
        })
        .finally(() => {
          setLoadingSubmit(false);
        });
    }
  };

  const showModal = (e, item = {}) => {
    e.stopPropagation();
    form.resetFields();
    setWebInfo(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = values => {
    if (webInfo._id) {
      setLoadingSubmit(true);
      axios
        .put(`${baseWebURL}${webInfo._id}`, { data: values })
        .then(res => {
          if (res.status === 200) {
            setIsModalVisible(false);
          }
        })
        .catch(err => {
          console.dir(err);
        })
        .finally(() => {
          setLoadingSubmit(false);
        });
    } else {
      setLoadingSubmit(true);
      axios
        .post(baseWebURL, { data: values })
        .then(res => {
          if (res.status === 201) {
            success();
            setIsModalVisible(false);
          }
        })
        .catch(err => {
          console.dir(err);
        })
        .finally(() => {
          setLoadingSubmit(false);
        });
    }
    form.resetFields();
  };

  return (
    <>
      {!loading ? (
        <>
          {list.map(item => (
            <div
              className={styles.gridItem}
              key={item?._id}
              onClick={() => {
                location.href = item.webURL;
              }}
            >
              <div className={styles.card}>
                <img src={item?.iconURL} className={styles.cardImg} />
                {/* <CloseCircleOutlined
                  className={edit ? styles.iconClose : styles.hide}
                  onClick={() => deleteWeb(item._id)}
                /> */}
                <EditOutlined
                  className={edit ? styles.iconEdit : styles.hide}
                  onClick={e => showModal(e, item)}
                />
              </div>
              <p>{item?.name}</p>
            </div>
          ))}
          <div onClick={showModal} className={styles.gridItem}>
            <PlusCircleOutlined className={styles.icon} />
            <p>添加快捷方式</p>
          </div>
          <Modal
            onCancel={handleCancel}
            title="添加快捷方式"
            visible={isModalVisible}
            footer={null}
          >
            <Form layout="vertical" name="basic" onFinish={onFinish} form={form}>
              <Form.Item
                label="名称"
                name="name"
                rules={[
                  { required: true, message: "请输入网址名称!" },
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error("网址名称需要超过2位"));
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="网址"
                name="webURL"
                rules={[
                  { required: true, message: "请输入网址!" },
                  {
                    validator: async (_, names) => {
                      if (!webRule(names)) {
                        return Promise.reject(new Error("请输入正确的网址"));
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="图标地址"
                name="iconURL"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!webRule(names)) {
                        return Promise.reject(new Error("请输入正确的图标地址"));
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <footer className={styles.footer}>
                <Button
                  key="back"
                  className={webInfo?.name ? "" : styles.hide}
                  onClick={() => {
                    deleteWeb(webInfo?._id);
                  }}
                >
                  删除
                </Button>
                <div>
                  <Button
                    key="cancel"
                    type="primary"
                    className={styles.right}
                    onClick={handleCancel}
                  >
                    取消
                  </Button>
                  <Button key="submit" type="primary" loading={loadingSubmit} htmlType="submit">
                    完成
                  </Button>
                </div>
              </footer>
            </Form>
          </Modal>
        </>
      ) : (
        <div className={styles.example}>
          <Spin />
        </div>
      )}
    </>
  );
}
