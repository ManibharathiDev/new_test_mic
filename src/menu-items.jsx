const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id:'master',
      title:'MASTER',
      type:'group',
      icon:'icon-ui',
      children:[
        {
            id: 'users',
            title: 'Users',
            type: 'collapse',
            //url: '/app/users',
            children:[
              {
                id:'view_users',
                title:'View User',
                type:'item',
                url: '/app/users/view',
              },
              {
                  id:'create_users',
                  title:'Create New User',
                  type:'item',
                  url: '/app/users/create',
              },
              {
                id:'user_mapping',
                title:'Assembly Mapping',
                type:'item',
                url: '/app/users/mapping',
              }
            ]
        },
        {
          id: 'parties',
          title: 'Party',
          type: 'collapse',
          //url: '/app/users',
          children:[
            {
              id:'view_party',
              title:'View Parties',
              type:'item',
              url: '/app/party/view',
            },
            {
                id:'create_parties',
                title:'Create New Party',
                type:'item',
                url: '/app/party/create',
            }
          ]
      },
      {
        id: 'voters',
        title: 'Voters',
        type: 'collapse',
        //url: '/app/users',
        children:[
          {
            id:'view_voters',
            title:'View Voters',
            type:'item',
            url: '/app/voters/view',
          },
          {
              id:'create_voters',
              title:'Create New Voters',
              type:'item',
              url: '/app/voters/create',
          },
          {
            id:'import_voters',
            title:'Import Voters',
            type:'item',
            url: '/app/voters/import',
          },
          {
            id:'export_voters',
            title:'Export Voters',
            type:'item',
            url: '/app/voters/export',
          }
        ]
    },
        {
          id: 'countries',
          title: 'Country',
          type: 'collapse',
          // icon: 'icon-ui',
          // url: '/app/countries',
          children:[
            {
              id:'view_country',
              title:'View Country',
              type:'item',
              url: '/app/countries',
            },
            {
                id:'create_country',
                title:'Create New Country',
                type:'item',
            }
          ]
        },
        {
          id: 'states',
          title: 'States',
          type: 'item',
          icon: 'icon-ui',
          url: '/app/states',
        },
        {
          id: 'districts',
          title: 'District',
          type: 'item',
          icon: 'icon-ui',
          url: '/app/districts',
        },
        {
          id: 'lok_constituency',
          title: 'Loksabha Constitency',
          type: 'item',
          icon: 'icon-ui',
          url: '/app/lok_constituency',
        },
        {
          id: 'leg_constituency',
          title: 'Legislative Constitency',
          type: 'item',
          icon: 'icon-ui',
          url: '/app/leg_constituency',
        },
      ]
    },
    {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/basic/breadcrumb-paging'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Form Elements',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/forms/form-basic'
        },
        {
          id: 'table',
          title: 'Table',
          type: 'item',
          icon: 'feather icon-server',
          url: '/tables/bootstrap'
        }
      ]
    },
    {
      id: 'chart-maps',
      title: 'Chart & Maps',
      type: 'group',
      icon: 'icon-charts',
      children: [
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          icon: 'feather icon-pie-chart',
          url: '/charts/nvd3'
        },
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/maps/google-map'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        // {
        //   id: 'sample-page',
        //   title: 'Sample Page',
        //   type: 'item',
        //   url: '/sample-page',
        //   classes: 'nav-item',
        //   icon: 'feather icon-sidebar'
        // },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-book',
          classes: 'nav-item',
          url: 'https://codedthemes.gitbook.io/datta/',
          target: true,
          external: true
        },
        {
          id: 'menu-level',
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Menu Level 1.1',
              type: 'item',
              url: '#!'
            },
            {
              id: 'menu-level-1.2',
              title: 'Menu Level 2.2',
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-2.1',
                  title: 'Menu Level 2.1',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'menu-level-2.2',
                  title: 'Menu Level 2.2',
                  type: 'collapse',
                  children: [
                    {
                      id: 'menu-level-3.1',
                      title: 'Menu Level 3.1',
                      type: 'item',
                      url: '#'
                    },
                    {
                      id: 'menu-level-3.2',
                      title: 'Menu Level 3.2',
                      type: 'item',
                      url: '#'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          classes: 'nav-item disabled',
          icon: 'feather icon-power'
        }
      ]
    }
  ]
};

export default menuItems;
