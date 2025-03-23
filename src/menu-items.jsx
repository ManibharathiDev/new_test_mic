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
          id: 'parliament',
          title: 'Parliaments',
          type: 'collapse',
          children:[
            {
              id:'view_parliament',
              title:'View Parliaments',
              type:'item',
              url: '/app/constituency/view',
            },
            {
                id:'create_parliament',
                title:'Create New Parliament',
                type:'item',
                url:'/app/constituency/create'
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
      id: 'panjyath',
      title: 'Panjayath Union',
      type: 'collapse',
      //url: '/app/users',
      children:[
        {
          id:'view_panjayath',
          title:'View Panyajath Unions',
          type:'item',
          url: '/app/panjayath/view',
        },
        {
            id:'create_panjayath',
            title:'Create New panjayath Union',
            type:'item',
            url: '/app/panjayath/create',
        }
      ]
  },
  {
    id: 'village',
    title: 'Grama Panjayath',
    type: 'collapse',
    //url: '/app/users',
    children:[
      {
        id:'view_village',
        title:'View Grama Panjayath',
        type:'item',
        url: '/app/village/view',
      },
      {
          id:'create_village',
          title:'Create New Grama Panjayath',
          type:'item',
          url: '/app/village/create',
      },
      {
        id:'create_villagse',
        title:'Import Grama Panjayath',
        type:'item',
        url: '/app/village/import',
    },
    ]
},
    {
      id: 'community_caste',
      title: 'Community & Caste',
      type: 'collapse',
      //url: '/app/users',
      children:[
        {
          id:'view_religion',
          title:'View Religion',
          type:'item',
          url: '/app/religion/view',
          
        },
        {
            id:'create_religion',
            title:'Create New Religion',
            type:'item',
            url: '/app/religion/create',
            
        },
        {
          id:'view_community',
          title:'View Community',
          type:'item',
          url: '/app/community/view',
          
        },
        {
            id:'create_community',
            title:'Create New Community',
            type:'item',
            url: '/app/community/create',
            
        },
        {
          id:'view_caste',
          title:'View Caste',
          type:'item',
          url: '/app/caste/view',
        },
        {
            id:'create_caste',
            title:'Create New Caste',
            type:'item',
            url: '/app/caste/create',
        },
        {
          id:'view_subcaste',
          title:'View Subcaste',
          type:'item',
          url: '/app/subcaste/view',
        },
        {
            id:'create_subcaste',
            title:'Create New Subcaste',
            type:'item',
            url: '/app/subcaste/create',
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
              title:'Create Voters',
              type:'item',
              url: '/app/voters/create',
          },
          {
            id:'import_voters',
            title:'Import Voters',
            type:'item',
            url: '/app/voters/import',
          },
          // {
          //   id:'export_voters',
          //   title:'Export Voters',
          //   type:'item',
          //   url: '/app/voters/export',
          // }
        ]
    },
       
      ]
    },
    
   
    
  ]
};

export default menuItems;
