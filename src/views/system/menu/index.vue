<template>
    <div class="p-3">
        <el-form :model="queryParams" ref="queryRef" :inline="true">
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="queryParams.name" placeholder="请输入菜单名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb-8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>

        </el-row>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column prop="name" label="菜单名称" />
            <el-table-column prop="orderNum" label="排序" sortable />
            <el-table-column prop="icon" label="图标" />
            <el-table-column label="icon">
                <template #default="scope">
                    <div>
                        <component class="w-[15px] mr-2 ml-1" :is="scope.row.icon" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="path" label="路由" />
            <el-table-column prop="component" label="组件路径" />
            <el-table-column prop="createBy" label="创建人" />
        </el-table>
        <!-- 新增修改对话框 -->
        <el-dialog v-model="dialogVisible" title="新增菜单" width="40%">
            <el-form :model="form" label-width="120px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="上级菜单">
                            <el-cascader :show-all-levels="false" @change="handleMenuChange" :options="homeStore.menuList"
                                :props="defaultProps" clearable />

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单名称">
                            <el-input v-model="form.name" placeholder="请输入菜单名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组件路径">
                            <el-input v-model="form.component" placeholder="请输入菜单名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="图标">
                            <el-input v-model="form.icon" placeholder="请选择图标" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="路由地址">
                            <el-input v-model="form.path" placeholder="请输入路由地址" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序">
                            <el-input v-model="form.orderNum" type="number" />
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addMenuList">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from "vue"
import { getMenuList, addMenu } from "@/http/menu"
import { MenuVo } from "@/http/menu/types/menu.vo"
import home from "@/store"
const homeStore = home()
const queryParams = reactive({
    name: ""
})
const defaultProps = {
    children: 'children',
    label: 'name',
    value: 'id',
    checkStrictly: true,
}
//表格列表
const tableData = ref([])
const handleQuery = async () => {
    const { data } = await getMenuList(queryParams)
    tableData.value = data
}
handleQuery()
const resetQuery = () => {
    queryParams.name = ''
}

//新增
const form = reactive<MenuVo>({
    name: '',
    path: '',
    parentId: null,
    component: '',
    orderNum: 0,
    icon: '',
    id: null,
})
const dialogVisible = ref(false)

const handleAdd = () => {
    dialogVisible.value = true
}
const addMenuList = async () => {
    const { data } = await addMenu(form)
}
const handleMenuChange = (val: any) => {


    form.parentId = val[val.length - 1]

}
</script>
