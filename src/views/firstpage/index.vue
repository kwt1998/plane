<template>
  <div class="firstpage-container">
    <el-card style="background-color: #303133; border-radius: 10px; text-align: center;">
      <p class="name">Welcome {{name}}</p>
    </el-card>
    <el-tag style="margin-top: 40px; width: 100%" type="info">{{year-1}}-{{year}}年销售状况</el-tag>
    <div style="margin-top: 20px; margin-left: 20px; margin-right: 50px">
      <div id="myChart2" style="width: 50%; height: 400px; float: left; "></div>
      <div id="myChart" style="width: 50%; height: 400px; float: right; "></div>
    </div>
    <el-tag style="margin-top: 40px; width: 100%" type="info"></el-tag>
    <!--</el-card>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Firstpage',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        year: 0,
        month: 0
      }
    },
    mounted() {
      const myDate = new Date()
      this.year = myDate.getFullYear()
      this.month = myDate.getMonth()
      this.drawLine()
      this.drawCircle()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              },
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['销售票数', '销售额']
          },
          xAxis: [
            {
              type: 'category',
              data: [(this.month) % 12 + 1 + '月', (this.month + 1) % 12 + 1 + '月', (this.month + 2) % 12 + 1 + '月', (this.month + 3) % 12 + 1 + '月', (this.month + 4) % 12 + 1 + '月', (this.month + 5) % 12 + 1 + '月', (this.month + 6) % 12 + 1 + '月', (this.month + 7) % 12 + 1 + '月', (this.month + 8) % 12 + 1 + '月', (this.month + 9) % 12 + 1 + '月', (this.month + 10) % 12 + 1 + '月', (this.month - 1) % 12 + 1 + '月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '销售票数',
              min: 0,
              max: 2500,
              interval: 500,
              axisLabel: {
                formatter: '{value} 张'
              }
            },
            {
              type: 'value',
              name: '销售额',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} 万元'
              }
            }
          ],
          series: [
            {
              name: '销售票数',
              type: 'bar',
              data: [1000, 1234, 1598, 1987, 2444, 2114, 1456, 1622, 1241, 987, 1664, 2241],
              itemStyle: {
                normal: {
                  color: '#5dacf6'
                },
                emphasis: {
                  color: '#83bff6'
                }
              }
            },
            {
              name: '销售额',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        })
      },
      drawCircle() {
        const myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart2.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['经济舱', '普通舱', '头等舱']
          },
          series: [
            {
              name: '票数/张',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '经济舱', selected: true },
                { value: 679, name: '普通舱' },
                { value: 1548, name: '头等舱' }
              ]
            },
            {
              name: '销售额/万元',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: [
                { value: 335, name: '经济舱' },
                { value: 310, name: '普通舱' },
                { value: 234, name: '头等舱' }
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .firstpage-container {
    background-color: #DCDFE6;
    height: 900px;
  }

  .name {
    font-size: 50px;
    margin-top: unset;
    font-family: Georgia;
    font-weight: bold;
    color: #F2F6FC;
  }
</style>
