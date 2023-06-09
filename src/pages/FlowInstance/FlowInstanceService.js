import {request as httpUtils, constants,} from "@/utils";

const {baseUrl} = constants;

export async function getFlowInstance(params = {}) {
  Object.assign(params, {
    sortOrders: [{property: 'lastEditedDate', direction: 'DESC'}],
    quickSearchProperties: ["flowName", "businessId", "businessCode", "businessModelRemark", "creatorName", "creatorAccount"],
  });
  return httpUtils.postJson(baseUrl + "/flowInstance/findByPage", params);
}

export async function findBusinessModelByAppModuleId(params = {}) {
  return httpUtils.post(baseUrl + "/businessModel/findByAppModuleId", params);
}

export async function findFlowTypeByBusinessModelId(params = {}) {
  return httpUtils.post(baseUrl + "/flowType/findByBusinessModelId", params);
}

export async function allFlowType() {
  return httpUtils.get(baseUrl + "/flowType/getAll").then(data => {
    if (data && data.length > 0) {
      for (var i in data) {
        data[i].businessModelName = data[i].businessModel.name;
        data[i].businessModelAppModuleName = data[i].businessModel.appModule.name;
      }
      return data;
    }
  });
}

//强制终止流程
export async function endForce(instanceId) {
  return httpUtils.postJson(baseUrl + `/flowInstance/endForce/${instanceId}`);
}

//待办补偿
export async function taskFailTheCompensation(instanceId) {
  return httpUtils.get(baseUrl + `/flowInstance/taskFailTheCompensation?instanceId=` + instanceId);
}

//自动执行补偿
export async function selfMotionExecuteTask(params = {}) {
  return httpUtils.post(baseUrl + `/flowSolidifyExecutor/selfMotionExecuteTask`, params);
}

//检查并获取流程中可以跳转节点信息
export async function checkAndGetCanJumpNodeInfos(instanceId) {
  return httpUtils.get(baseUrl + `/flowInstance/checkAndGetCanJumpNodeInfos?instanceId=` + instanceId);
}

//获取跳转目标节点信息
export async function getTargetNodeInfo(params = {}) {
  return httpUtils.get(baseUrl + `/flowInstance/getTargetNodeInfo`, params);
}

//获取全部组织机构
export async function listAllOrgs() {
  return httpUtils.postJson(baseUrl + "/flowDefination/listAllOrgs");
}

//获取组织机构下员工（包含下级组织机构）
export async function listUserByOrg(orgId, searchValue, pageInfo) {
  return httpUtils.postJson(baseUrl + "/flowDefination/listUserByOrg", {
    organizationId: orgId,
    includeSubNode: true,
    quickSearchValue: searchValue,
    pageInfo: pageInfo
  })
}

//节点跳转
export async function jumpToTargetNode(params = {}) {
  return httpUtils.postJson(baseUrl + "/flowInstance/jumpToTargetNode", params);
}

//修改说明
export async function updateRemark(params = {}) {
  return httpUtils.postJson(baseUrl + "/flowInstance/updateRemarkByInstaceId", params);
}





