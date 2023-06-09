<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="房屋编号" prop="rId">
        <el-input
          v-model="queryParams.rId"
          placeholder="请输入房屋编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单元ID" prop="uId">
        <el-input
          v-model="queryParams.uId"
          placeholder="请输入单元ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input
          v-model="queryParams.floor"
          placeholder="请输入楼层"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建筑面积" prop="floorArea">
        <el-input
          v-model="queryParams.floorArea"
          placeholder="请输入建筑面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="室内面积" prop="innerArea">
        <el-input
          v-model="queryParams.innerArea"
          placeholder="请输入室内面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业主ID" prop="residentId">
        <el-input
          v-model="queryParams.residentId"
          placeholder="请输入业主ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['resource:room:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['resource:room:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['resource:room:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['resource:room:export']"
        >导出</el-button>
      </el-col>
      <el-upload
        class="upload-demo"
        :action="uploadFileUrl"
        multiple
        :limit="3"
        :before-upload="test"
        :headers="headers"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="roomList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="房屋编号" align="center" prop="rId" />
      <el-table-column label="单元ID" align="center" prop="uId" />
      <el-table-column label="楼层" align="center" prop="floor" />
      <el-table-column label="户型" align="center" prop="houseType" />
      <el-table-column label="房屋状态" align="center" prop="status" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="建筑面积" align="center" prop="floorArea" />
      <el-table-column label="室内面积" align="center" prop="innerArea" />
      <el-table-column label="业主ID" align="center" prop="residentId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['resource:room:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['resource:room:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改房屋信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="房屋编号" prop="rId">
          <el-input v-model="form.rId" placeholder="请输入房屋编号" />
        </el-form-item>
        <el-form-item label="单元ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入单元ID" />
        </el-form-item>
        <el-form-item label="楼层" prop="floor">
          <el-input v-model="form.floor" placeholder="请输入楼层" />
        </el-form-item>
        <el-form-item label="建筑面积" prop="floorArea">
          <el-input v-model="form.floorArea" placeholder="请输入建筑面积" />
        </el-form-item>
        <el-form-item label="室内面积" prop="innerArea">
          <el-input v-model="form.innerArea" placeholder="请输入室内面积" />
        </el-form-item>
        <el-form-item label="业主ID" prop="residentId">
          <el-input v-model="form.residentId" placeholder="请输入业主ID" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRoom, getRoom, delRoom, addRoom, updateRoom,importRoom } from "@/api/resource/room";
import { getToken } from "@/utils/auth";

export default {
  name: "Room",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 房屋信息表格数据
      roomList: [],
      uploadFileUrl: "http://localhost:8080/resource/room/import",
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        rId: null,
        uId: null,
        floor: null,
        houseType: null,
        status: null,
        type: null,
        floorArea: null,
        innerArea: null,
        residentId: null,
      },
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        rId: [
          { required: true, message: "房屋编号不能为空", trigger: "blur" }
        ],
        uId: [
          { required: true, message: "单元ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    test(){
      return true;
    },
    /** 查询房屋信息列表 */
    getList() {
      this.loading = true;
      listRoom(this.queryParams).then(response => {
        this.roomList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        rId: null,
        uId: null,
        floor: null,
        houseType: null,
        status: null,
        type: null,
        floorArea: null,
        innerArea: null,
        residentId: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加房屋信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRoom(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改房屋信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRoom(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRoom(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除房屋信息编号为"' + ids + '"的数据项？').then(function() {
        return delRoom(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('resource/room/export', {
        ...this.queryParams
      }, `room_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
