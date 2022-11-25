
module.exports = {
  title: 'Winhex 数据恢复题库 v1',
  description: 'im0o.top winhex数据恢复教程配套题库',
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  base: '/winhex-tiku/',
  markdown: {lineNumbers: true},
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    displayAllHeaders: true,
    sidebar: [
      {
        title: '简介',
        path: '/tiku/',
        collapsable: false,
        sidebarDepth: 2,
      },
      {
        title: '例题',
        collapsable: false,
        path: '/tiku/main/',
        sidebarDepth: 2,
        // children: autosidebar('/tiku/main/')
        // children: [
        //   {
        //     title: '01-填写MBR',
        //     path: '/tiku/main/01-填写MBR',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //   },
        //   {
        //     title: '02-导出损坏分区FAT32中的文件',
        //     path: '/tiku/main/02-导出损坏分区FAT32中的文件',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //   },
        //   {
        //     title: '03-恢复FAT32分区（手动填写DBR）',
        //     path: '/tiku/main/03-恢复FAT32分区（手动填写DBR）',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //   },
        //   {
        //     title: '04-恢复 FAT32 中被删除的文件',
        //     path: '/tiku/main/04-恢复 FAT32 中被删除的文件',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //   },
        // ]
      },
      {
        title: '其他题目',
        collapsable: false,
        path: '/tiku/others/',
        sidebarDepth: 2,
        // children: [
        //   {
        //     title: '综合题-断电导致磁盘错误与误操作数据恢复工具格式化修复',
        //     path: '/tiku/others/综合题-断电导致磁盘错误与误操作数据恢复工具格式化修复.md',
        //     collapsable: false,
        //     sidebarDepth: 1,
        //   },
        // ]
      },
      
    ]
  },
}