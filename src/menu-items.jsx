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
          id: 'countries',
          title: 'Country',
          type: 'collapse',
          children:[
            {
              id:'view_country',
              title:'View Country',
              type:'item',
              url: '/app/country/view',
            },
            {
                id:'create_country',
                title:'Create New Country',
                type:'item',
                url: '/app/country/create',
            }
          ]
        },
        {
          id: 'states',
          title: 'States',
          type: 'collapse',
          children:[
            {
              id:'view_state',
              title:'View States',
              type:'item',
              url: '/app/state/view',
            },
            {
                id:'create_stte',
                title:'Create New State',
                type:'item',
                url: '/app/state/create',
            }
          ]
        },
        {
          id: 'districts',
          title: 'District',
          type: 'collapse',
          children:[
            {
              id:'view_district',
              title:'View Districts',
              type:'item',
              url: '/app/district/view',
            },
            {
                id:'create_district',
                title:'Create New District',
                type:'item',
                url: '/app/district/create',
            }
          ]
        },
        {
          id: 'constituency',
          title: 'Constituency',
          type: 'collapse',
          children:[
            {
              id:'view_constituency',
              title:'View Constituencies',
              type:'item',
              url: '/app/constituency/view',
            },
            {
                id:'create_constituency',
                title:'Create New Constituency',
                type:'item',
            }
          ]
        },
        {
          id: 'assembly',
          title: 'Assembly',
          type: 'collapse',
          //url: '/app/users',
          children:[
            {
              id:'view_loksaba',
              title:'View Assemblies',
              type:'item',
              url: '/app/assembly/view',
            },
            {
                id:'create_loksaba',
                title:'Create New Assembly',
                type:'item',
                url: '/app/assembly/create',
            }
          ]
      },
      {
        id: 'wards',
        title: 'Wards',
        type: 'collapse',
        //url: '/app/users',
        children:[
          {
            id:'view_wards',
            title:'View Wards',
            type:'item',
            url: '/app/wards/view',
          },
          {
              id:'create_ward',
              title:'Create New Ward',
              type:'item',
              url: '/app/wards/create',
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
       
      ]
    },
    
   
    
  ]
};

export default menuItems;
