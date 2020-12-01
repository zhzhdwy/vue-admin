<template>
  <div>
    <el-dialog title="更新公司主体" :visible.sync="dialogDisible" @close="close" @opened="openDialog">
      <el-form label-position="right" :model="company" ref="addCompanyForm">
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="company.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="公司地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="company.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="营业执照" :label-width="formLabelWidth" prop="license">
          <el-input v-model="company.license" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="开户行" :label-width="formLabelWidth" prop="bank_name">
          <el-input v-model="company.bank_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="户名" :label-width="formLabelWidth" prop="bank_account">
          <el-input v-model="company.bank_account" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="银行账号" :label-width="formLabelWidth" prop="bank_number">
          <el-input v-model="company.bank_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth" prop="contact">
          <el-input v-model="company.contact" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="contact_phone">
          <el-input v-model="company.contact_phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="contact_email">
          <el-input v-model="company.contact_email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input v-model="company.note" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="updateCompany" :loading="button_load">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {ref, watch, reactive} from "@vue/composition-api";
import {UpdateCompanys} from "@/api/company"

export default {
  name: 'company.vue',
  props: {
    //主组件传来的<DialogInfo :flag="dialog_info" @close="close"/>
    flag: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0,
    },
    companyDate: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, {emit, root, refs}) {
    const dialogDisible = ref(false)
    const formLabelWidth = ref("150px")
    const button_load = ref(false)
    const company = reactive({
      id: 0,
      name: "",
      address: "",
      license: "",
      bank_name: "",
      bank_account: "",
      bank_number: "",
      contact: "",
      contact_phone: "",
      contact_email: "",
      note: "",
    })


    ///////////////////////////////////////////////
    const openDialog = () => {
      company.id = props.companyDate.id
      company.name = props.companyDate.name
      company.address = props.companyDate.address
      company.license = props.companyDate.license
      company.bank_name = props.companyDate.bank_name
      company.bank_account = props.companyDate.bank_account
      company.bank_number = props.companyDate.bank_number
      company.contact = props.companyDate.contact
      company.contact_phone = props.companyDate.contact_phone
      company.contact_email = props.companyDate.contact_email
      company.note = props.companyDate.note
    }


    //关闭弹出方法
    const close = (() => {
      dialogDisible.value = false
      emit('close', false)
    })

    //取消
    const reset = () => {
      refs.addCompanyForm.resetFields();
      close()
    }

    //提交 TODO:填写内容的校验
    const updateCompany = () => {
      button_load.value = true
      UpdateCompanys(company).then(response => {
        emit('fromDialogUpdate', {index: props.index, company: company})
        root.$message.success(response.data.smg)
        // reset()
        close()
        button_load.value = false
      }).catch(error => [
        button_load.value = false
      ])
    }

    watch(() => props.flag, (newValue) => {
      dialogDisible.value = newValue
    })

    return {
      dialogDisible, company, formLabelWidth, button_load,
      close, reset, updateCompany, openDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.note {
  display: inline-block;
  height: 120px;
  width: 100%;
  border-top: 1px solid rgb(244, 244, 244);
}
</style>