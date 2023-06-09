/**
 * Created by liusonglin on 2018/7/12.
 */

import React, {Component} from 'react';
import {Select} from 'antd';
import { commonUtils, } from '@/utils';

const {isEmpty} = commonUtils;

const Option = Select.Option;

export default class SelectWithService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            selectValue: undefined,
            loading:false
        }
    }

    componentWillMount() {
        const {initValue,params={}} = this.props;
        if (initValue && !this.props.value) {
            this.getDataSource(params,true)
        } else {
            this.getDataSource(params,false)
        }
    }

    componentDidUpdate() {
        const {key, text} = this.props.config;
        const {value,labelInValue} = this.props;
        let tempVaule = value;
        let textValue = this.state.selectValue;
        if(labelInValue){
            tempVaule = value&&value.key;
            textValue = textValue?this.state.selectValue.text:textValue;
        }
        if (tempVaule || tempVaule === 0) {
            this.state.dataSource.map(item => {
                if (item[key] === tempVaule && item[text] !== textValue) {
                    if(!labelInValue){
                        this.setState({selectValue: item[text]})
                    }else{
                        this.setState({selectValue:{key:item[key],text:item[text]}})
                    }
                }
                return;
            })
        }
        if (!tempVaule && tempVaule!==0 && textValue) {
            if(!labelInValue){
                this.setState({selectValue: undefined})
            }else{
                this.setState({selectValue: {key: "",text: ""}})
            }
        }
    }

    //传入参数，级联操作
    componentWillReceiveProps(nextProps) {
        if (nextProps.params &&
            this.props.params &&
            Object.values(nextProps.params).toString() !== Object.values(this.props.params).toString()) {
                if(this.props.initValue){
                    this.getDataSource(nextProps.params,true)
                }else {
                    this.getDataSource(nextProps.params);
                }
            if (this.props.value === nextProps.value && !isEmpty(nextProps.value)) {
                this.props.onChange('');
            }
        }
    }

    getDataSource(params, initValue) {
        this.setState({loading:true})
        const {key} = this.props.config;
        // if(this.state.dataSource.length === 0 || this.props.config.service.toString().includes('ByPage')){
            this.props.config.service({...params,Q_EQ_frozen__bool:0}).then((res) => {
                if (res.data) {
                    this.setState({dataSource: res.data.filter(item => Object.keys(item).includes('frozen')?item.frozen===false:true)})
                    if (initValue) {
                        this.props.onChange(res.data[0][key], res.data[0]);
                    }
                } else if (res.rows) {
                    this.setState({dataSource: res.rows.filter(item => Object.keys(item).includes('frozen')?item.frozen===false:true)})
                    if (initValue) {
                        this.props.onChange(res.rows[0][key], res.rows[0]);
                    }
                } else if(res instanceof Array){
                    this.setState({dataSource: res.filter(item => Object.keys(item).includes('frozen')?item.frozen===false:true)})
                    if (initValue) {
                        this.props.onChange(res[0][key], res[0]);
                    }
                }
            }).finally(()=>{
                this.setState({loading:false})
            })
        // }
    };

    onSearchHandle = (value) => {
        if(this.props.remoteSearch){
            this.getDataSource({Quick_value:value})
        }
    }

    handleChange = (value) => {
        this.props.onChange(value);
    }
    render() {
        const {text, key} = this.props.config
        const options = this.state.dataSource.map(d => <Option value={d[key]} key={d[key]}>{d[text]}</Option>);
        return (
            <Select
                labelInValue={this.props.labelInValue}
                placeholder={this.props.placeholder}
                allowClear={true}
                loading={this.state.loading}
                getPopupContainer={(triggerNode)=> triggerNode}
                disabled={this.props.disabled}
                value={this.state.selectValue}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                showSearch={true}
                style={{width: '100%',...this.props.style}}
                onSearch={this.onSearchHandle}
                onChange={this.handleChange}>
                {options}
            </Select>
        );
    }
}

