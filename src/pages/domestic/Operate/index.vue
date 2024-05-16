<template>
  <div class="common-layout">
    <!-- 弹窗 -->
    <el-dialog :title="`当前浏览器 - ${currentBrowserId}`" v-model="dialogVisible" custom-class="custom-dialog">
      <div class="edit-tags-container">
        <div class="edit-tags-title">
          包含:
        </div>
        <div class="edit-tags-input">
          <el-select
              v-model="editedTagsTest"
              multiple
              placeholder="Select"
              style="width: 100%; height: 100%"
              size="large"
              @change="getSelectedTagsEdit"
              :max-collapse-tags="10"
              dropdown-menu-align="center"
          >
            <!-- 使用 prepend 插槽将标签放在输入框前面 -->
            <template prepend>
              <el-tag v-for="color in editedTagsTest" closable @close="handleCloseTagEdit(color)" size="large"
                      inherit style="color: inherit">
                {{ color }}
              </el-tag>
            </template>
            <!-- 将标签列表放在 el-option 内 -->
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <div class="flex items-center">
                  <el-tag :type="item.type" :key="item.value" style="margin-right: 8px" size="small">
                    {{ item.value }}
                  </el-tag>
                </div>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitEditTags" size="large">保存修改</el-button>
        <el-button @click="dialogVisible = false" size="large" type="warning">取消</el-button>
      </div>
    </el-dialog>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <div class="m-4">
          <div class="edit-tags-title">
            包含:
          </div>
          <el-select
              v-model="value2"
              multiple
              placeholder="请选择标签"
              style="width: 200px"
              clearable
              size="large"
              tag-type="success"
              @change="getSelectedTags"
              :max-collapse-tags="3"
              dropdown-menu-align="center"
          >
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <div class="flex items-center">
                  <el-tag :type="item.type" :key="item.value" style="margin-right: 8px" size="small">
                    {{ item.value }}
                  </el-tag>
                </div>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="m-4">
          <div class="edit-tags-title">
            不包含:
          </div>
          <el-select
              v-model="value3"
              multiple
              placeholder="请选择标签"
              tag-type="danger"
              style="width: 200px"
              clearable
              size="large"
              @change="getSelectedNoTags"
              :max-collapse-tags="3"
              dropdown-menu-align="center"
          >
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <div class="flex items-center">
                  <el-tag :type="item.type" :key="item.value" style="margin-right: 8px" size="small">
                    {{ item.value }}
                  </el-tag>
                </div>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="m-4">
          <div class="edit-tags-title">
            &nbsp;
          </div>
          <el-select
              v-model="status_value"
              multiple
              placeholder="状态"
              tag-type="success"
              style="width: 160px"
              size="large"
              @change="getSelectedStatus"
              :max-collapse-tags="3"
              dropdown-menu-align="center"
          >
            <el-option
                v-for="item in status_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
              <div class="flex items-center">
                <el-tag :type="item.type" :key="item.value" style="margin-right: 8px" size="small">
                  {{ item.label }}
                </el-tag>
              </div>
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="large">查找</el-button>
      </el-form-item>
      <el-form-item>
        <div class="m-4">
          <el-select
              v-model="bro_func_value"
              placeholder="请选择操作类型"
              style="width: 180px"
              clearable
              @change="getSelectedBroFunc(bro_func_value)"
              filterable
              size="large"
              :max-collapse-tags="3"
          >
            <el-option-group
                v-for="group in operate_options"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-option-group>
          </el-select>
          <el-select
              v-model="maxProcesses"
              placeholder="线程数"
              style="width: 75px"
              size="large"
              filterable
              :max-collapse-tags="3"
          >
            <el-option
                v-for="item in max_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="executeBroFunc" size="large">开始执行</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :loading="loading" stripe max-height="700px"
              @selection-change="handleSelectionChange" size="large"
    >
      <el-table-column type="selection" width="50px" label="多选">
      </el-table-column>
      <el-table-column prop="index" label="编号" width="60px" sortable></el-table-column>
      <el-table-column prop="browser_name" label="名称" width="100px"></el-table-column>
      <el-table-column prop="group" label="分组" width="120px"></el-table-column>
      <el-table-column prop="remarks" label="备注" width="100px"></el-table-column>
      <el-table-column prop="tags" label="标签" width="240px">
        <template v-slot="scope">
          <el-tag v-for="tag in scope.row.tags" :type="tag.type">
            {{ tag.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100px">
        <template v-slot="scope">
          <div v-if="scope.row.status === 'idle'" class="Idle">
            <el-tag type="info">空闲</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'running'" class="In_progress">
            <el-tag type="warning">进行中</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'wait'" class="In_progress">
            <el-tag type="primary">等待中</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'success'" class="completed">
            <el-tag type="success">已完成</el-tag>
          </div>
          <div v-else class="completed">
            <el-tag type="danger">意外中断</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="current_operation" label="当前操作" width="160px">
        <template v-slot="scope">
          <div v-if="scope.row.current_operation === '暂无操作'" class="Idle">
            <el-tag type="primary">{{ scope.row.current_operation }}</el-tag>
          </div>
          <div v-else class="completed">
            <el-tag type="success">{{ scope.row.current_operation }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="last_update" label="上一次使用" width="120px"></el-table-column>
      <el-table-column prop="ip_address" label="IP 地址" width="150px"></el-table-column>
      <el-table-column label="修改标签" width="160px">
        <template v-slot="scope">
          <el-button type="success" @click="handleEditTags(scope.row.tags,scope.row.browser_name,scope.row.index)"
                     size="default">修改标签
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          :page-count="totalPage"
          layout="sizes, prev, pager, next, jumper,total"
          :page-sizes="[2,10, 20, 40, 50, 100]"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
      />
    </div>
    <!--          <el-button size="large" type="primary" @click="push_city" v-show="false">新增区域城市</el-button>-->
    <div v-for="(item,index) in city_values" :key="index" v-show="false" hidden="hidden">
      <div class="test1_main">
        <div>
          <el-button type="primary" @click="splice_city(index)">删除</el-button>
        </div>
        <div class="test1_ch">
          区域城市{{ index + 1 }}
          <el-select
              v-model="item['city_value']"
              placeholder="Select"
              size="large"
              style="width: 240px"
          >
            <el-option
                v-for="item_1 in city_options"
                :key="item_1.value"
                :label="item_1.label"
                :value="item_1.value"
            />
          </el-select>
        </div>
        <div v-for="(item2,index2) in item['address_list']" :key="index2" class="test1_ch">
          地址{{ index2 + 1 }}
          <el-input v-model="item2['label']" style="width: 300px" placeholder="Please input" size="large"/>
          <el-button v-if="index2==0" class="btn_1" type="primary" @click="push_city_address(index)">+</el-button>
          <el-button v-if="index2!=0" class="btn_1" type="primary" @click="splice_city_address(index,index2)">-
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import "element-plus/theme-chalk/el-message.css";
import {inject, onMounted, reactive, ref} from 'vue';
import {AxiosInstance} from 'axios';
import {ElMessage} from "element-plus";
import {Cur_platformType, platformType} from '../config'

interface TableData {
  id: number;
  index: number;
  browser_name: string;
  group: string;
  remarks: string;
  tags: string[];
  status: number;
  lastUpdate: string;
  ipAddress: string;
}

interface TagData {
  value: string;
  label: string;
  type: string;
}

interface Operate_Option {
  label: string;
  options: [TagData];
}

interface DialogTag {
  name: string;
  type: string;
}

interface Tag_Option {
  label: string;
  options: [TagData];
}

const city_options = [
  {
    value: '深圳',
    label: '深圳',
  },
  {
    value: '深圳1',
    label: '深圳1',
  },
  {
    value: '深圳2',
    label: '深圳2',
  },
  {
    value: '深圳3',
    label: '深圳3',
  },
]

const status_options = [
  {
    value: 'idle',
    label: '空闲',
    type: 'info',
  },
  {
    value: 'running',
    label: '进行中',
    type: 'warning',
  },
  {
    value: 'wait',
    label: '等待中',
    type: 'primary',
  },
  {
    value: 'success',
    label: '已完成',
    type: 'success',
  },
  {
    value: 'error',
    label: '意外中断',
    type: 'danger',
  },
]
const city_values = ref([
  {
    city_value: '深圳',
    address_list: [
      {label: '福田区001'},
    ],
  },
])
const push_city_address = (city_id: any) => {
  city_values.value[city_id]['address_list'].push({label: '福田区000'})
  console.log(city_id)
  console.log(city_values)
}

// const push_city = () => {
//   city_values.value.push({city_value: '深圳', address_list: [{label: '福田区001'}]})
//   console.log(city_values)
// }
const splice_city = (city_id: any) => {
  city_values.value.splice(city_id, 1)
}
const splice_city_address = (city_id: any, address_id: any) => {
  city_values.value[city_id]['address_list'].splice(address_id, 1)
}


const formInline = reactive({
  user: '',
  region: '',
  date: '',
});

const max_options: any[] = [];
for (let i = 1; i <= 20; i++) {
  max_options.push({
    label: i,
    value: i,
    type: i
  });
}

const status_value = ref<string[]>([]);
const value2 = ref<string[]>([]);
const value3 = ref<string[]>([]);
const bro_func_value = ref<string>('');
const bro_func_name = ref<string>('');

const sendTagList = ref<string[]>([]); // 初始化为空数组
const sendNoTagList = ref<string[]>([]); // 初始化为空数组
const selectedBrowserIds = ref<string[]>([]); // 选中的浏览器 ID 数组
const options = ref<Tag_Option[]>([]); // 初始化为空数组
const tableData = ref<TableData[]>([]); // 初始化为空数组
const total = ref(0); // 数据总数
const currentPage = ref(1); // 当前页码
const loading = ref(false); // 加载状态
const pageSize = ref(20); // 每页显示的数据条数
const totalPage = ref(0); // 总页数
const dialogVisible = ref(false); // 弹窗状态
const editedTags = ref<DialogTag[]>([]); // 编辑的标签
const currentBrowserId = ref<string>(''); // 当前浏览器
const currentBrowserName = ref<string>(''); // 当前浏览器名称
const editedTagsTest = ref<string[]>([]); // 编辑的标签
const operate_options = ref<Operate_Option[]>([]) // 操作列表 初始化为空数组
const $http: AxiosInstance = inject('$http') as AxiosInstance; // 注入 axios 实例
const $local: AxiosInstance = inject('$local') as AxiosInstance; // 注入 axios 实例
const maxProcesses = ref(4);
//getSelectedNumber

const fetchData = async (pageNum: number, pageSize: number, sendTagList: string[], sendNoTagList: string[]) => {
  // 独立的异步函数
  try {
    loading.value = true;

    const sendStatusList = status_value.value
    // const platformType = Cur_platformType.value
    const response = await $http.post('/get_browserList', {
      data: {
        pageNum,
        pageSize,
        sendTagList,
        sendNoTagList,
        sendStatusList,
        platformType,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }); // 使用全局配置的 axios
    tableData.value = response.data.list;
    total.value = response.data.total;
    totalPage.value = Math.ceil(response.data.total / pageSize);
    loading.value = false;
    console.log(response.data);
  } catch (error) {
    ElMessage({
      message: '服务器未启动',
      type: 'error'
    })
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
};

const getTagList = async () => {
  // 独立的异步函数
  try {
    loading.value = true;

    const response = await $http.post('/get_tagList', {
      data: {
        platformType,
      }
    }); // 使用全局配置的 axios
    options.value = response.data.list;
    console.log(response.data);
  } catch (error) {
    ElMessage({
      message: '服务器未启动',
      type: 'error'
    })
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
};

const getOperateList = async () => {
  // 独立的异步函数
  try {
    loading.value = true;

    const response = await $http.post('/get_operateList', {
      data: {
        platformType,
      }
    }); // 使用全局配置的 axios
    operate_options.value = response.data.list;
    console.log(response.data);
  } catch (error) {
    ElMessage({
      message: '服务器未启动',
      type: 'error'
    })
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
};

const handleSelectionChange = (selection: TableData[]) => {
  // 处理选中项
  selectedBrowserIds.value = selection.map(item => item.browser_name);
  console.log(selectedBrowserIds.value.toString().split(","));
};

const handlePageChange = (pageNum: number) => {
  // 处理页码
  fetchData(pageNum, pageSize.value, sendTagList.value, sendNoTagList.value);
  console.log(tableData);
};

const handlePageSizeChange = (newPageSize: number) => {
  // 修改每页显示的数据条数
  pageSize.value = newPageSize;
  // 重新获取数据
  fetchData(currentPage.value, newPageSize, sendTagList.value, sendNoTagList.value);
};

const executeBroFunc = async () => {
  // 执行操作
  try {
    loading.value = true;
    const sendBroList = selectedBrowserIds.value.toString().split(",");
    const send_func_value = bro_func_value.value;
    const send_maxProcesses = maxProcesses.value;
    const send_func_name = bro_func_name.value;
    const response = await $local.post('/execution_method', {
      data: {
        send_func_value,
        sendBroList,
        send_maxProcesses,
        send_func_name
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }); // 使用全局配置的 axios); // 使用全局配置的 axios
    console.log(response.data);
    if (response.data.statu_code === 'success') {
      setTimeout(() =>
          onSubmit(), 1000
      )
    }
    ElMessage({
      message: response.data.msg,
      type: response.data.statu_code
    })
  } catch (error) {
    ElMessage({
      message: '404',
      type: 'error',
    })
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
  console.log(selectedBrowserIds.value);
};

const handleEditTags = (tags: DialogTag[], browser_name: string, current_browser_id: string) => {
      // 处理修改标签
      // 打开修改标签弹窗
      dialogVisible.value = true;
      // 1. 获取当前选中项的标签列表
      editedTags.value = tags;
      editedTagsTest.value = tags.map(item => item.name);
      currentBrowserName.value = browser_name;
      currentBrowserId.value = current_browser_id;
      // console.log(tags);
      // console.log(envent);
      console.log(editedTags.value);
      // 2. 显示标签选择框

      // 3. 点击确定按钮，发送请求修改标签
      // 4. 刷新表格数据

      // 5. 关闭弹窗
      console.log(dialogVisible.value);
      console.log('handleEditTags');
    }
;

// const handleCloseTag = (tag: TagData, index: number) => {
//   // 处理关闭标签
//   console.log(tag, index);
//   editedTags.value.splice(index, 1);
//   console.log(editedTags.value);
// };
const handleCloseTagEdit = (name: string) => {
  // 处理关闭标签
  editedTagsTest.value = editedTagsTest.value.filter(item => item !== name);
  // editedTagsTest.value = editedTagsTest.value.filter(item => item.name !== name);
  console.log(editedTagsTest.value);
};

const onSubmitEditTags = async () => {
  // 提交修改标签
  try {
    loading.value = true;
    const send_browser_id = currentBrowserName.value;
    const send_tags = editedTagsTest.value;
    // 关闭弹窗
    dialogVisible.value = false;
    const response = await $http.post('/edit_tags', {
      data: {
        send_browser_id,
        send_tags,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }); // 使用全局配置的 axios
    ElMessage({
      message: response.data.msg,
      type: response.data.statu_code,
    })
    console.log(response.data);
  } catch (error) {
    ElMessage({
      message: '404',
      type: 'error',
    })
    // 处理错误，例如显示错误信息给用户
  }
  console.log(dialogVisible.value);
};

function getSelectedBroFunc(newVal: string) {
  // 获取选中的操作
  console.log(newVal);
  let selectedOption;
  for (const option of operate_options.value) {
    if (option.options) {
      selectedOption = option.options.find(item => item.value === newVal);
      if (selectedOption) {
        break;
      }
    }
  }
  bro_func_name.value = selectedOption ? selectedOption.label : '';
  // console.log(selectedOption);
  console.log(bro_func_name.value);
}

const getSelectedTags = () => {
  // 获取选中的标签
  sendTagList.value = value2.value;
  console.log(value2.value);
  console.log(sendTagList.value);
};

const getSelectedNoTags = () => {
  // 获取选中的标签
  sendNoTagList.value = value3.value;
  console.log(value2.value);
  console.log(sendTagList.value);
};

const getSelectedStatus = () => {
  console.log(status_value.value)
}

const getSelectedTagsEdit = () => {
  // 获取选中的标签
  // editedTagsTest.value = editedTagsTest.value.concat(value2.value);
  console.log(editedTagsTest.value);
};

const onSubmit = () => {
  // 提交表单
  fetchData(1, pageSize.value, sendTagList.value, sendNoTagList.value);
  console.log('submit!');
};

onMounted(() => {
  // 获取数据
  fetchData(currentPage.value, pageSize.value, [], sendNoTagList.value);
  getTagList();
  getOperateList();
});
</script>

<style lang="css">
/* 通用样式 */

.el-tag {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 16px;
}

.el-button {
  margin-right: 10px;
  font-size: 16px;
}

.el-dialog .el-tag {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
}

.my-dialog {
  width: 500px;
  height: 300px;
  border-radius: 10px;
}

.edit-tags-container {
  margin-right: 5px;
  height: 50px;
  padding: 0 10px;
}

.edit-tags-title {
  display: inline-block;
  margin-right: 5px;
  height: 50px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 16px;
}

.edit-tags-input {
  display: inline-block;
  margin-right: 5px;
  height: 50px;
  width: 80%;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 16px;
}

.edit-tags-input .el-tag {
  margin-right: 5px;
  height: 100%;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 20px;
}

.dialog-footer {
  text-align: right;
  margin-top: 20px;
}

.test1_main {
  background-color: #4aeadc;
  width: 600px;
  padding-top: 20px;
  padding-bottom: 40px;
}

.test1_ch {
  width: 95%;
  margin-top: 10px;
}

.test1_ch_1 .el-input {
  position: relative;
}

.btn_1 {
  margin-left: 5px;
}
</style>

