/**
 * <p/>
 * 实现功能：应用模块
 * <p/>
 *
 * @author 李艳
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, message, Input, Modal} from 'antd';
import SimpleTable from "../../../commons/components/SimpleTable";
import {hide, show} from "../../../configs/SharedReducer";
import {deleteCorp, getAllList, save} from "./AppModuleService";
import {searchListByKeyWithTag} from "../../../commons/utils/CommonUtils";
import EditAppModuleModal from "./EditAppModuleModal";
import HeadBreadcrumb from "../../../commons/components/breadcrumb/HeadBreadcrumb";
import {getWorkPage} from "../WorkPage/WorkPageService";
import {getBusinessModel} from "../businessModel/BusinessModelService";
const Search = Input.Search;
const confirm = Modal.confirm;

class AppModuleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      confirmLoading: false,
      selectedRows: [],
      isAdd: false
    };
  }

  componentWillMount() {
    this.getDataSource()
  }

  onRef = (ref) => {
    this.ref = ref
  };
  getDataSource = () => {
    this.props.show();
    getAllList().then(data => {
      this.setState({data, selectedRows: [], searchValue: ""})
    }).catch(e => {
    }).finally(() => {
      this.props.hide();
    })
  };

  handleRowSelectChange = (selectedRows) => {
    this.setState({selectedRows})
  };
  handleModalVisible = (modalVisible, isAdd) => {
    this.setState({modalVisible, isAdd})
  };
  addClick = () => {
    this.handleModalVisible(true, true)
  };
  editClick = (record) => {
    this.setState({editData:record});
    this.handleModalVisible(true, false)
  };
  handleSave = () => {
    this.ref.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {}
        Object.assign(params, values);
        if (this.state.isAdd)
          delete params.id;//新增时id==="",保存可能会出错，需删除id
        this.setState({confirmLoading: true});
        save(params).then(result => {
          if (result.status === "SUCCESS") {
            message.success(result.message ? result.message : "请求成功");
            //刷新本地数据
            this.getDataSource();
            this.setState({confirmLoading: false, modalVisible: false});
          } else {
            message.error(result.message ? result.message : "请求失败");
            this.setState({confirmLoading: false});
          }
        }).catch(e => {
          this.setState({confirmLoading: false});
        })
      }
    })
  };

  handleModalCancel = () => {
    this.handleModalVisible(false)
  };

  handleSearch = (value) => {
    searchListByKeyWithTag(this.state.data, {keyword: value},["code","name"]).then(data => {
      this.setState({data, searchValue: value})
    })
  };

  deleteClick = (record) => {
    let thiz = this;
    confirm({
      title: "温馨提示",
      content: "删除后不可恢复，是否确定删除？",
      onOk() {
        let params = {};
        params = record.id;
        thiz.props.show();
        /*校验下面是否有业务实体和工作界面配置:建议改为后端校验*/
        getBusinessModel({filters: [{
            fieldName: "appModule.id",//筛选字段
            operator: "EQ",//操作类型
            value: params,//筛选值
            fieldType: "String"//筛选类型
          }]}).then(data=>{
          if(data.records > 0){
            message.warn("该应用模块下面配置有业务实体，不能删除！")
            thiz.props.hide();
            return;
          }
          getWorkPage({
            filters: [{
              fieldName: "appModuleId",//筛选字段
              operator: "EQ",//操作类型
              value: params,//筛选值
              fieldType: "String"//筛选类型
            }]
          }).then(data => {
            if(data.records > 0){
              message.warn("该应用模块下面配置有工作界面，不能删除！")
              thiz.props.hide();
              return;
            }
            /*删除*/
            deleteCorp(params).then(result => {
              if (result.status === "SUCCESS") {
                message.success(result.message ? result.message : "请求成功");
                //刷新本地数据
                thiz.getDataSource();
              } else {
                message.error(result.message ? result.message : "请求失败");
              }
            }).catch(e => {
            }).finally(() => {
              thiz.props.hide();
            })
          });
        });
      }
    });
  };

  render() {
    const columns = [
      {
        title: "操作",
        width:120,
        dataIndex: "operator",
        render: (text, record, index) => {
          return (
            <div className={'row-operator'}  onClick={(e) => {
              e.stopPropagation()
            }}>
              <a className={'row-operator-item'} onClick={()=>this.editClick(record)}>编辑</a>
              <a className={'row-operator-item'} onClick={()=>this.deleteClick(record)}>删除</a>
            </div>
          )
        }
      },
      {
        title: '代码',
        dataIndex: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: 200
      },
      {
        title: '描述',
        dataIndex: 'remark',
        width: 200
      },
      {
        title: 'web服务代码',
        dataIndex: 'webBaseAddress',
        width: 220
      },
      {
        title: 'api服务代码',
        dataIndex: 'apiBaseAddress',
        width: 220,
      },
      {
        title: '排序',
        dataIndex: 'rank',
        width: 80
      }
    ];

    const title = () => {
      return [
        <Button type={"primary"}  className={"primaryButton"}  key="edit" onClick={this.addClick}>新增</Button>,
      ]
    };

    //表头搜索框
    const search = () => {
      return [
        <Search
          key="search"
          placeholder="输入名称或代码进行查询"
          onSearch={value => this.handleSearch(value)}
          style={{width: 220}}
          allowClear
        />
      ]
    };
      const {editData,searchValue,data,selectedRows,isAdd,modalVisible,confirmLoading}=this.state;
    return (

      <HeadBreadcrumb>
        <div className={"tbar-table"}>
          <div className={'tbar-box'}>
            <div className={'tbar-btn-box'}>{title()}</div>
            <div className={'tbar-search-box'}>{search()}</div>
          </div>
          <SimpleTable
            rowsSelected={selectedRows}
            onSelectRow={this.handleRowSelectChange}
            data={searchValue ?data.filter(item => item.tag === true) : data}
            columns={columns}
          />
        </div>
        <EditAppModuleModal
          isAdd={isAdd}
          modalVisible={modalVisible}
          confirmLoading={confirmLoading}
          handleOk={this.handleSave}
          handleCancel={this.handleModalCancel}
          onRef={this.onRef}
          defaultValue={editData? editData : {}}/>
      </HeadBreadcrumb>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => {
      dispatch(show())
    },
    hide: () => {
      dispatch(hide())
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModuleTable)



