<script src="../../../store/modules/login.js"></script>
<template>
  <div class="top-warp">
    <el-row :gutter="0">
      <el-col :span="2">
        <el-button type="primary" size="small" class="add_button" @click="dialogDisible.create = true">添加公司</el-button>
      </el-col>
      <!--        公司名称查询-->
      <el-col :span="22">
        <div class="pull-right">
          <label>
            搜索
            <el-input v-model="searchData.keyword" placeholder="请输入公司名称" class="search_input" size="small"></el-input>
          </label>
          <el-button type="primary" @click="searchCompanys" class="search_button" size="small">查找</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <!--    表格数据-->

    <el-table :data="companyTableData.companys" style="width: 100%" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="公司名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="公司地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="营业执照">
              <span>{{ props.row.license }}</span>
            </el-form-item>
            <el-form-item label="开户行">
              <span>{{ props.row.bank_name }}</span>
            </el-form-item>
            <el-form-item label="户名">
              <span>{{ props.row.bank_account }}</span>
            </el-form-item>
            <el-form-item label="银行账号">
              <span>{{ props.row.bank_number }}</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ props.row.contact }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.contact_phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.contact_email }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.note }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" prop="name" width="300"></el-table-column>
      <el-table-column label="联系人" prop="contact" width="80"></el-table-column>
      <el-table-column label="联系电话" prop="contact_phone" width="160"></el-table-column>
      <el-table-column label="邮箱" prop="contact_email" width="200"></el-table-column>
      <el-table-column label="公司地址" prop="address" width="400"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="opendialogUpdate(scope.$index, scope.row)">更新</el-button>
          <el-button size="mini" type="danger" @click="deleteCompanyCommit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>
    <!--    分页-->
    <div class="pull-right">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-sizes="[5, 10, 20, 50]"
                     :page-size="companyTableData.page.pageSize"
                     :current-page.sync="companyTableData.page.currentPage"

                     :total="companyTableData.page.total">
      </el-pagination>

      <!--      添加弹窗-->
      <!--   :flag传给了子组件   -->
      <DialogCreate :flag="dialogDisible.create" @close="close" @getCompanys="getCompanys"/>
      <!--  不需要回调可以写成以下这种
      <DialogInfo :flag.sync="dialogDisible" @close="close"/>
      emit("update:flag", false); //子组件写法
      -->
      <!--update弹窗-->
      <DialogUpdate :flag="dialogDisible.update" @close="close"
                        @fromDialogUpdate="fromDialogUpdate"
                        :companyDate="updataData.company"
                        :index="updataData.index"/>
    </div>

  </div>
</template>

<script>
import DialogCreate from './dialogCreate';
import DialogUpdate from './dialogUpdate';
import {reactive, ref, onMounted} from "@vue/composition-api";
import {GetCompanys, DeleteCompany, SearchCompanys} from "@/api/company"
import {global} from "@/utils/global3.0";

export default {
  name: 'company.vue',
  components: {
    DialogCreate,
    DialogUpdate
  },
  setup(props, {root}) {
    const {confirm} = global()
    const companyTableData = reactive({
      companys: [],
      index: -1,
      row: [],
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      }
    })

    const loading = ref(false)
    const searchData = reactive({
      keyword: "",
    })
    const dialogDisible = reactive({
      create: false,
      update: false
    })

    const updataData = reactive({
      company: {},
      index: -1,
    })

    //
    //方法/////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //更新弹窗方法
    const opendialogUpdate = (index, row) => {
      dialogDisible.update = true
      updataData.index = index
      updataData.company = row
    }

    const fromDialogUpdate = (param) => {
      console.log(param.company)
      console.log(param.index)
      companyTableData.companys.splice(param.index, 1, param.company)
      console.log(companyTableData.companys)
    }


    //获取初始公司列表
    const getCompanys = () => {
      let data = {
        keyword: "",
        Page: companyTableData.page.currentPage,
        limit: companyTableData.page.pageSize,
        offset: (companyTableData.page.currentPage - 1) * companyTableData.page.pageSize,
      }
      loading.value = true
      GetCompanys(data).then(response => {
        let data = response.data.data
        companyTableData.companys = data.results
        companyTableData.page.total = data.total
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }
    ///////////////////////////////////////////////////////////////////////////////
    //页码
    const handleSizeChange = (val) => {
      companyTableData.page.pageSize = val
      getCompanys()
    }

    const handleCurrentChange = (val) => {
      companyTableData.page.currentPage = val
      getCompanys()
    }

    //手动找到index, es6 findIndex
    // let index = tableData.companys.findIndex(companys => companys.id == deleteId.value)
    ///////////////////////////////////////////////////////////////////////////////////
    //删除确认弹窗
    const deleteCompanyCommit = (index, row) => {
      companyTableData.index = index
      companyTableData.row = row
      confirm({
        content: "确定删除该公司信息吗？",
        tip: "警告",
        thenFn: deleteCompany,
        catchFn: () => {
          companyTableData.index = ''
          companyTableData.row = ''
        },
      })
    }

    // 删除公司数据
    const deleteCompany = () => {
      DeleteCompany({id: companyTableData.row.id}).then(response => {
        root.$message.success(companyTableData.row.name + "已经删除!")
        companyTableData.companys.splice(companyTableData.index, 1);
      }).catch(error => {
        root.$message.error(companyTableData.row.name + "删除失败!")
      })
    }
    ///////////////////////////////////////////////////////////////////////////////
    //
    const close = (val) => {
      dialogDisible.create = val
      dialogDisible.update = val
    }
    ///////////////////////////////////////////////////////////////////////////////

    //更新数据

    ///////////////////////////////////////////////////////////////////////////////
    // 按公司名称查找
    const searchCompanys = () => {
      let data = {
        keyword: searchData.keyword,
        Page: companyTableData.page.currentPage,
        limit: companyTableData.page.pageSize,
        offset: (companyTableData.page.currentPage - 1) * companyTableData.page.pageSize,
      }
      loading.value = true
      SearchCompanys(data).then(response => {
        let data = response.data.data
        companyTableData.companys = data.results
        companyTableData.page.total = data.total
        loading.value = false
      }).catch(() => {
        loading.value = true
      })
    }


    //挂载完成时处理
    onMounted(() => {
          getCompanys()
        }
    )

    return {
      companyTableData, loading, searchData,
      deleteCompanyCommit, dialogDisible, close, opendialogUpdate, updataData,
      handleSizeChange, handleCurrentChange, searchCompanys, getCompanys, fromDialogUpdate
    }
  }
}
</script>

<style lang="scss" scoped>
.top-warp {
  .add_button .search_input {
    width: 110px;
  }

  label {
    display: inline-block;
    font-size: 15px;
  }

  .search_input {
    width: 200px;
    margin-left: 10px;
  }

  .search_button {
    width: 80px;
    margin-left: 10px;
    margin-top: -1px;
    box-sizing: border-box;
  }

}

.el-form--inline .el-form-item {
  display: block;
}

</style>