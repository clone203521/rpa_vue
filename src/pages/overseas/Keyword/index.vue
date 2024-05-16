<template>
  <div class="common-layout">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <div class="m-4">
          <div class="edit-tags-title">
            关键词:
          </div>
          <el-input v-model="input_keyword" style="width: 160px" size="large" placeholder="Please input"/>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="m-4">
          <div class="edit-tags-title">
            关键词类型
          </div>
          <el-select
              v-model="keyword_type"
              placeholder="请选择标签"
              tag-type="success"
              style="width: 200px"
              size="large"
              @change="getSelectedNoTags"
              :max-collapse-tags="3"
              dropdown-menu-align="center"
          >
            <el-option
                v-for="item in type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
              <div class="flex items-center">
                <el-tag type="primary" :key="item.value" style="margin-right: 8px" size="small">
                  {{ item.label }}
                </el-tag>
              </div>
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="large">查找</el-button>
        <el-button type="success" @click="insertDialogVisible = true" size="large">新增关键词</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%" :loading="loading" stripe max-height="700px"
              @selection-change="handleSelectionChange" size="large"
    >
      <el-table-column type="selection" width="50px" label="多选">
      </el-table-column>
      <el-table-column prop="index" label="编号" width="60px" sortable></el-table-column>
      <el-table-column prop="keyword" label="名称" width="200">
        <template v-slot="scope">
          <el-tag type="primary">{{ scope.row.keyword }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="200"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="success" @click="click_update_keyword(scope.row.keyword)">修改</el-button>
          <el-popconfirm
              width="220"
              confirm-button-text="是的"
              cancel-button-text="暂时不"
              icon-color="#626AEF"
              title="确认要删除吗?"
              confirm-button-type="primary"
              @confirm="delete_keyword(scope.row.keyword)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
  </div>
  <el-dialog v-model="updateDialogVisible" title="修改关键词" width="500">
    <el-form :model="form">
      <el-form-item label="当前关键词" label-width="140px">
        <el-input v-model="current_keyword" autocomplete="off" disabled size="large"/>
      </el-form-item>
      <el-form-item label="关键词类型" label-width="140px">
        <el-tag type="primary" size="large">{{ keyword_type_comment }}</el-tag>
      </el-form-item>
      <el-form-item label="新关键词" label-width="140px">
        <el-input v-model="form.keyword" size="large" aria-required="true"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialogVisible = false" size="large">返回</el-button>
        <el-button type="primary" @click="update_keyword()" size="large">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="insertDialogVisible" title="新增关键词" width="500">
    <el-form :model="form2">
      <el-form-item label="关键词类型" label-width="140px">
        <el-tag type="primary" size="large">{{ keyword_type_comment }}</el-tag>
      </el-form-item>
      <el-form-item label="新关键词" label-width="140px">
        <el-input v-model="form2.keyword" size="large" aria-required="true"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="insertDialogVisible = false" size="large">返回</el-button>
        <el-button type="primary" @click="insert_keyword()" size="large">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">

import "element-plus/theme-chalk/el-message.css";
import {inject, onMounted, reactive, ref} from 'vue';
import {AxiosInstance} from 'axios';
import {ElMessage} from "element-plus";
import {platformType,default_keyword_type} from '../config'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
});

const form = reactive({
  name: '',
  keyword: '',
})
const form2 = reactive({
  name: '',
  keyword: '',
})

interface TableData {
  id: number;
  keyword: string;
  update_time: string;
}

interface Type_Option {
  label: string;
  value: string;
}

const total = ref(0); // 数据总数
const currentPage = ref(1); // 当前页码
const loading = ref(false); // 加载状态
const pageSize = ref(20); // 每页显示的数据条数
const totalPage = ref(0); // 总页数
const tableData = ref<TableData[]>([]); // 初始化为空数组
const $http: AxiosInstance = inject('$http') as AxiosInstance; // 注入 axios 实例
const keyword_type = default_keyword_type;
const keyword_type_comment = ref('Facebook小组搜索')
const selectedKeywordIds = ref<string[]>([]); // 选中的浏览器 ID 数组
const type_options = ref<Type_Option[]>([]); // 初始化为空数组
const input_keyword = ref('') // 输入框关键词
const current_keyword = ref('') //  当前要修改的关键词
const updateDialogVisible = ref(false)  //  更新关键词弹窗是否显示
const insertDialogVisible = ref(false)  //  新增弹窗是否显示

const click_update_keyword = (keyword: string) => {
  current_keyword.value = keyword
  updateDialogVisible.value = true
}

const getTypeList = async () => {
  // 独立的异步函数
  try {
    loading.value = true;
    const response = await $http.post('/get_keyword_type',{
      data:{
        platformType,
      }
    }); // 使用全局配置的 axios
    type_options.value = response.data.list;
    console.log(response.data);
    keyword_type_comment.value = <string>findLabelByValue(keyword_type)
  } catch (error) {
    ElMessage()
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
};

function findLabelByValue(value: string) {
  const item = type_options.value.find((item) => item.value === value);
  return item ? item.label : null;
}

const fetchData = async (pageNum: number, pageSize: number) => {
  // 独立的异步函数
  try {
    loading.value = true;
    const send_type = keyword_type
    const send_keyword = input_keyword.value
    const response = await $http.post('/get_keywords', {
      data: {
        pageNum,
        pageSize,
        send_type,
        send_keyword,
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
    console.error('获取数据错误:', error);
    // 处理错误，例如显示错误信息给用户
  }
};

const handleSelectionChange = (selection: TableData[]) => {
  // 处理选中项
  selectedKeywordIds.value = selection.map(item => item.keyword);
  console.log(selectedKeywordIds.value.toString().split(","));
};

const handlePageChange = (pageNum: number) => {
  // 处理页码
  fetchData(pageNum, pageSize.value);
  console.log(tableData);
};

const handlePageSizeChange = (newPageSize: number) => {
  // 修改每页显示的数据条数
  pageSize.value = newPageSize;
  // 重新获取数据
  fetchData(currentPage.value, newPageSize);
};

const onSubmit = () => {
  // 提交表单
  fetchData(currentPage.value, pageSize.value);
  console.log('submit!');
};

const getSelectedNoTags = () => {
  // 获取选中的标签
  // ke.value = value3.value;
  console.log(keyword_type, '  ', input_keyword.value)
};

const delete_keyword = async (keyword: string) => {
  // 执行操作
  try {
    const send_type = keyword_type
    const send_keywords = [keyword]
    const response = await $http.post('/delete_keywords', {
      data: {
        send_keywords,
        send_type,
        platformType,
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
}

const update_keyword = async () => {
  // 执行操作
  if (form.keyword === '') {
    ElMessage({
      message: '请输入新关键词',
      type: 'warning',
    })
    return
  }
  try {
    updateDialogVisible.value = false
    const send_type = keyword_type
    const send_change_keywords = [{
      before_keyword: current_keyword.value,
      after_keyword: form.keyword,
    }]
    const response = await $http.post('/update_keywords', {
      data: {
        send_change_keywords,
        send_type,
        platformType,
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
}
const insert_keyword = async () => {
  // 执行操作
  try {
    insertDialogVisible.value = false
    const send_type = keyword_type
    const send_keywords = [form2.keyword]
    const response = await $http.post('/insert_keywords', {
      data: {
        send_keywords,
        send_type,
        platformType,
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
}

onMounted(() => {
  // 获取数据
  fetchData(currentPage.value, pageSize.value)
  getTypeList();
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


.edit-tags-title {
  display: inline-block;
  margin-right: 5px;
  height: 50px;
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

/* ::v-deep是vue3提供的深度选择器，.el-form-item__label是element-plus官方定义的类 */
.el-form-item__label {
  font-size: 16px; /* 设置字体大小 */
  display: flex;
  align-items: center;
  margin: 0 auto;
}

</style>

