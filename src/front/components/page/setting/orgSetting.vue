<template>
	<div>
		<el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="orgForm">
			<el-form-item label="顶层组织" prop="topOrg">
		    <el-input v-model="form.topOrg" placeholder="请输入顶层组织"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">增加顶层组织</el-button>
		  </el-form-item>
		</el-form>
		<el-tree
	  	:data="orgTree"
	  	node-key="id"
	  	:render-content="renderContent"
	  	class="org-tree"
		>
		</el-tree>
	</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        topOrg: ''
      },
      rules: {
        topOrg: [
          { required: true, message: '请输入顶层组织' }
        ]
      },
      // orgTree: [{
      //   id: 'org-1',
      //   label: '顶级',
      //   children: [{
      //     id: 'org-2-1',
      //     label: '二级-1'
      //   }, {
      //     id: 'org-2-2',
      //     label: '二级-2'
      //   }]
      // }]
      orgTree: []
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
      this.$refs.orgForm.validate((valid) => {
        if (valid) {
          console.log('sumbit')
          this.orgTree.push({
            id: 'org-1',
            label: this.form.topOrg
          })
        } else {
          return false
        }
      })
    },
    append (store, data) {
      store.append({ id: 'org-test', label: 'testtest', children: [] }, data)
      console.log(store)
    },
    remove (store, data) {
      store.remove(data)
    },
    submitTree (store) {
      console.log(store)
    },
    renderContent (h, { node, data, store }) {
      const { level, label } = node
      return (
        <span>
          <span>
            <span>{label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            {
              level === 1
              ? <el-button size="mini" on-click={ () => this.submitTree(store) } >保存</el-button> : null
            }
            <el-button size="mini" on-click={ () => this.append(store, data) }>新增</el-button>
            <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style>
.org-tree {
	width: 50%;
	min-width: 600px;
}
</style>