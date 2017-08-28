<template>
	<div>
		<el-tree
	  	:data="orgTree"
	  	node-key="id"
	  	:expand-on-click-node="false"
	  	:render-content="renderContent"
		>
		</el-tree>
	</div>
</template>

<script>
export default {
  data () {
    return {
      orgTree: [{
        id: 'org-1',
        label: '顶级',
        children: [{
          id: 'org-2-1',
          label: '二级-1'
        }, {
          id: 'org-2-2',
          label: '二级-2'
        }]
      }]
    }
  },
  methods: {
    renderContent (h, { node, data, store }) {
    }
  }
}
</script>