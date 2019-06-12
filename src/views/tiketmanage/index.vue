<template>
  <div style=" height: 900px; background-color: #DCDFE6">
    <div class="left">
      <el-form ref="form" label-width="120px" style=" margin-top: 50px;margin-bottom: 20px">
        <span style="font-weight: 900; color: #606266;">地点</span>
        <el-select v-model="sortForm.startcity" placeholder="出发">
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
            />
          </el-option-group>
        </el-select>
        <el-select v-model="sortForm.endcity" placeholder="到达">
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
            />
          </el-option-group>
        </el-select>
        <span style="font-weight: 900; color: #606266; margin-left: 10px">日期</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="sortForm.date"
          :picker-options="pickerOptions"
          align="right"
          placeholder="选择日期"
          type="date"
          @change="formatTime"
        />
        <el-tooltip effect="dark" content="可进行组合查询" placement="right-start">
          <el-button style="width: 80px;" type="primary" @click="onSubmit">查询</el-button>
        </el-tooltip>
        <!--<el-button style="width: 150px;margin-top: 10px" type="primary" @click="onSubmit">查询 (可组合)</el-button>-->
      </el-form>
    </div>
    <div class="right">
      <el-table
        stripe
        :data="tableData"
        style="width: 808px; margin-right: auto;margin-left: auto; "
        height="500px">
        <el-table-column
          prop=""
          label="航班号"
          width="120">
        </el-table-column>
        <el-table-column
          fixed
          prop="departuredata"
          label="出发时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop=""
          label="到达时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="source"
          label="出发省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="destination"
          label="到达省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="剩余张数"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="danger"
              size="mini">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-button @click="addticket()">-->
        <!--添加新航班-->
      <!--</el-button>-->
      <!--<el-dialog-->
        <!--:visible.sync="dialogVisible"-->
        <!--width="400px"-->
        <!--:before-close="handleClose">-->
        <!--<span slot="title">添加航班</span>-->
        <!--<h4>请输入航班号</h4>-->
        <!--<el-input v-model="addForm.source" type="password"/>-->
        <!--<h4>请输入起点</h4>-->
        <!--<el-input v-model="addForm.destination" type="password"/>-->
        <!--<h4>请输入终点</h4>-->
        <!--<el-input v-model="addForm.departuretime" type="password"/>-->
        <!--<h4>请输入起飞时间</h4>-->
        <!--<el-input v-model="addForm.landingtime" type="password"/>-->
        <!--<h4>请输入降落时间</h4>-->
        <!--<el-input v-model="addForm.changePass2" type="password"/>-->
        <!--<h4>请输入票价</h4>-->
        <!--经济舱：-->
        <!--<el-input v-model="addForm.seat1price" type="password"/>-->
        <!--张数：<el-input v-model="seat1number" type="password"/>-->
        <!--普通舱：-->
        <!--<el-input v-model="addForm.seat2price" type="password"/>-->
        <!--张数：<el-input v-model="seat2number" type="password"/>-->
        <!--头等舱：-->
        <!--<el-input v-model="addForm.seat3price" type="password"/>-->
        <!--张数：<el-input v-model="seat3number" type="password"/>-->
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
          <!--<el-button @click="sendticket">确 定</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->
    </div>
  </div>
</template>

<script>
  import { companysearch, deleteticket, addplane  } from '../../api/user'

  export default {
    data() {
      return {
        dialogVisible: false,
        sortForm: {
          companyid: '1',
          date: '',
          startcity: '',
          endcity: ''
        },
        // addForm: {
        //   companyid: this.sessionStorage.getItem('token'),
        //   source: '',
        //   destination: '',
        //   departuretime: '',
        //   daparturedata: '',
        //   landingtime: '',
        //   seat1price: '',
        //   seat1number: '',
        //   seat2price: '',
        //   seat2number: '',
        //   seat3price: '',
        //   seat3number: ''
        // },
        options: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        tableData: []
      }
    },
    methods: {

      onSubmit() {
        if (this.sortForm.date || this.sortForm.endcity || this.sortForm.startcity) {
          companysearch(this.sortForm).then(response => {
            this.tableData = response
          })
        } else {
          this.$message.error('请至少输入一项查询信息')
        }
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除票务', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          deleteticket(this.tableData[index].id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // addticket() {
      //    this.dialogVisible = true
      // },
      // sendticket() {
      //   this.$confirm('添加航班', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     addplane(this.addForm).then(response => {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
      // }
    }
  }
</script>
<style scoped>
  .left {
    width: 100%;
    float: left;
    text-align: center;
  }

  .right {
  }
</style>
