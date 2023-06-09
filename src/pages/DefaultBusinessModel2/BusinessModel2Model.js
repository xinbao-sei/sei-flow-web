/**
 * @description 业务订单编辑弹窗
 * @author 何灿坤
 */

import React, {Component} from 'react'
import {Form, Input, Modal, InputNumber} from 'antd';
import { seiLocale } from 'sei-utils';
import { commonUtils, } from '@/utils';

const {checkCode} = commonUtils;
const { seiIntl } = seiLocale;
const FormItem = Form.Item;
const {TextArea} = Input;

class EditBusinessModel2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
    }
  }

  handleClose = () => {
    this.props.form.resetFields();
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
    };

    const {confirmLoading, modalVisible, handleOk, handleCancel, defaultValue, isAdd , orgInfo} = this.props;
    const {getFieldDecorator} = this.props.form;
    let title =seiIntl.get({key: 'flow_000031', desc: '编辑'});
    let FormValue = defaultValue;
    if (isAdd) {
      title =seiIntl.get({key: 'flow_000039', desc: '新增'});
      FormValue = {}
    }
    return (
      <div>
        <Modal title={title}
               visible={modalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               width={600}
               afterClose={this.handleClose}
               confirmLoading={confirmLoading}
               maskClosable={false}
        >
          <FormItem
            style={{display: "none"}}
            label="id">
            {getFieldDecorator('id', {
              initialValue: FormValue.id ? FormValue.id : "",
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            style={{display: "none"}}
            label={seiIntl.get({key: 'flow_000141', desc: '组织机构ID'})}>
            {getFieldDecorator('orgId', {
              initialValue: FormValue.orgId ? FormValue.orgId : orgInfo.id,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            style={{display: "none"}}
            label={seiIntl.get({key: 'flow_000142', desc: '组织机构code'})}>
            {getFieldDecorator('orgCode', {
              initialValue: FormValue.orgCode ? FormValue.orgCode : orgInfo.code,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            style={{display: "none"}}
            label={seiIntl.get({key: 'flow_000143', desc: '组织机构租户代码'})}>
            {getFieldDecorator('tenantCode', {
              initialValue: FormValue.tenantCode ? FormValue.tenantCode : orgInfo.tenantCode,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            style={{display: "none"}}
            label={seiIntl.get({key: 'flow_000144', desc: '组织机构codePath'})}>
            {getFieldDecorator('orgPath', {
              initialValue: FormValue.orgPath ? FormValue.orgPath : orgInfo.codePath,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={seiIntl.get({key: 'flow_000126', desc: '组织机构'})}>
            {getFieldDecorator('orgName', {
              initialValue: FormValue.orgName ? FormValue.orgName : orgInfo.name,
              rules: [{required: false, message: seiIntl.get({key: 'flow_000094', desc: '请输入代码!'}),whitespace:true},{max:20,message:seiIntl.get({key: 'flow_000145', desc: '不超过20个字符！'})}]
            })(
              <Input disabled={true}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={seiIntl.get({key: 'flow_000133', desc: '业务名称'})}>
            {getFieldDecorator('name', {
              initialValue: FormValue.name ? FormValue.name : "",
              rules: [{required: true, message: seiIntl.get({key: 'flow_000042', desc: '请填写名称!'}),whitespace:true}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={seiIntl.get({key: 'flow_000134', desc: '申请说明'})}>
            {getFieldDecorator('applyCaption', {
              initialValue: FormValue.applyCaption ? FormValue.applyCaption : "",
              rules: [{required: true, message: seiIntl.get({key: 'flow_000146', desc: '请填写申请说明!'}),whitespace:true}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={seiIntl.get({key: 'flow_000138', desc: '单价'})}>
            {getFieldDecorator('unitPrice', {
              initialValue: FormValue.unitPrice ? FormValue.unitPrice : "",
              rules: [{validator:checkCode}]
            })(
              <InputNumber/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={seiIntl.get({key: 'flow_000139', desc: '数量'})}>
            {getFieldDecorator('count', {
              initialValue: FormValue.count ? FormValue.count : "",
              rules: [{validator:checkCode}]
            })(
              <InputNumber/>
            )}
          </FormItem>
          <FormItem
            label={seiIntl.get({key: 'flow_000147', desc: '备注说明'})}
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}>
            {getFieldDecorator('workCaption', {
              initialValue: FormValue.workCaption ? FormValue.workCaption : "",
            })(
              <TextArea rows={2} autosize={false}/>
            )}
          </FormItem>
        </Modal>
      </div>
    );
  }
}

EditBusinessModel2 = Form.create()(EditBusinessModel2);
export default EditBusinessModel2;
