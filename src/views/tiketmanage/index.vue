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
          v-model="sortForm.date"
          :picker-options="pickerOptions"
          align="right"
          placeholder="选择日期"
          type="date"
        />
        <el-tooltip  effect="dark" content="可进行组合查询" placement="right-start">
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
          fixed
          prop="date"
          label="出发时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="到达时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="出发省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="到达省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortForm: {
          date: '',
          startcity: '',
          endcity: ''
        },
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
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      onSubmit() {
        if (this.sortForm.date || this.sortForm.endcity || this.sortForm.startcity) {
          this.$ajax.post('/{id}', {
            data: this.sortForm.date,
            endcity: this.sortForm.endcity,
            startcity: this.sortForm.startcity
          })
            .then(function(response) {
               //
            })
            .catch(function(error) {
              console.log(error)
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
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
