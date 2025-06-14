import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import { path } from 'd3';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact:'true',
        path:'/app/users/view',
        element: lazy(()=>import('./views/users'))
      },
      {
        exact:'true',
        path:'/app/users/create',
        element: lazy(()=>import('./views/users/create'))
      },
      {
        exact:'true',
        path:'/app/users/mapping',
        element: lazy(()=>import('./views/users/mapping'))
      },
      {
        exact:'true',
        path:'/app/users/edit/:id',
        element: lazy(()=>import('./views/users/edit'))
      },
      {
        exact:'true',
        path:'/app/payment/view',
        element: lazy(()=>import('./views/payment/index'))
      },
      {
        exact:'true',
        path:'/app/payment/edit/:id',
        element: lazy(()=>import('./views/payment/edit'))
      },
      {
        exact:'true',
        path:'/app/payment/create',
        element: lazy(()=>import('./views/payment/create'))
      },
      {
        exact:'true',
        path:'/app/country/view',
        element: lazy(()=>import('./views/country'))
      },
      {
        exact:'true',
        path:'/app/country/create',
        element: lazy(()=>import('./views/country/create'))
      },
      {
        exact:'true',
        path:'/app/country/edit/:id',
        element: lazy(()=>import('./views/country/edit'))
      },
      {
        exact:'true',
        path:'/app/state/view',
        element: lazy(()=>import('./views/states'))
      },
      {
        exact:'true',
        path:'/app/state/create',
        element: lazy(()=>import('./views/states/create'))
      },
      {
        exact:'true',
        path:'/app/state/edit/:id',
        element: lazy(()=>import('./views/states/edit'))
      },
      {
        exact:'true',
        path:'/app/district/view',
        element: lazy(()=>import('./views/districts'))
      },
      {
        exact:'true',
        path:'/app/district/create',
        element: lazy(()=>import('./views/districts/create'))
      },
      {
        exact:'true',
        path:'/app/district/edit/:id',
        element: lazy(()=>import('./views/districts/edit'))
      },
      {
        exact:'true',
        path:'/app/assembly/create',
        // element: lazy(()=>import('./views/assembly/create'))
        element: lazy(()=>import('./views/assembly/create_assembly'))
      },
      {
        exact:'true',
        path:'/app/assembly/view',
        element: lazy(()=>import('./views/assembly/'))
      },
      {
        exact:'true',
        path:'/app/assembly/edit/:id',
        element: lazy(()=>import('./views/assembly/edit'))
      },
      {
        exact:'true',
        path:'/app/constituency/view',
        element: lazy(()=>import('./views/constituency/index'))
      },
      {
        exact:'true',
        path:'/app/constituency/create',
        element: lazy(()=>import('./views/constituency/create'))
      },
      {
        exact:'true',
        path:'/app/constituency/edit/:id',
        element: lazy(()=>import('./views/constituency/edit'))
      },
      {
        exact:'true',
        path:'/app/party/view',
        element: lazy(()=>import('./views/party'))
      },
      {
        exact:'true',
        path:'/app/party/create',
        element: lazy(()=>import('./views/party/create'))
      },
      {
        exact:'true',
        path:'/app/party/edit/:id',
        element: lazy(()=>import('./views/party/edit'))
      },
      {
        exact:'true',
        path:'/app/wards/view',
        element: lazy(()=>import('./views/wards/index'))
      },
      {
        exact:'true',
        path:'/app/wards/create',
        element: lazy(()=>import('./views/wards/create'))
      },
      {
        exact:'true',
        path:'/app/wards/edit/:id',
        element: lazy(()=>import('./views/wards/edit'))
      },

      {
        exact:'true',
        path:'/app/panjayath/view',
        element: lazy(()=>import('./views/panjyath/index'))
      },
      {
        exact:'true',
        path:'/app/panjayath/create',
        element: lazy(()=>import('./views/panjyath/create'))
      },
      {
        exact:'true',
        path:'/app/panjayath/edit/:id',
        element: lazy(()=>import('./views/panjyath/edit'))
      },

      {
        exact:'true',
        path:'/app/village/view',
        element: lazy(()=>import('./views/village/index'))
      },
      {
        exact:'true',
        path:'/app/village/create',
        element: lazy(()=>import('./views/village/create'))
      },
      {
        exact:'true',
        path:'/app/village/edit/:id',
        element: lazy(()=>import('./views/village/edit'))
      },
      {
        exact:'true',
        path:'/app/village/import',
        element: lazy(()=>import('./views/village/imports'))
      },

      {
        exact:'true',
        path:'/app/voters/view',
        element: lazy(()=>import('./views/voters/index'))
      },
      {
        exact:'true',
        path:'/app/voters/show/:id',
        element: lazy(()=>import('./views/voters/view'))
      },

      {
        exact:'true',
        path:'/app/voters/create',
        element: lazy(()=>import('./views/voters/create'))
      },

      {
        exact:'true',
        path:'/app/voters/import',
        element: lazy(()=>import('./views/voters/import'))
      },
      {
        exact:'true',
        path:'/app/voters/export',
        element: lazy(()=>import('./views/voters/export'))
      },
      // {
      //   exact:'true',
      //   path:'/app/voters/import',
      //   element: lazy(()=>import('./views/voters'))
      // },
      {
        exact:'true',
        path:'/app/religion/create',
        element: lazy(()=>import('./views/community_caste/create_religion'))
      },
      {
        exact:'true',
        path:'/app/religion/view',
        element: lazy(()=>import('./views/community_caste/view_religion'))
      },
      {
        exact:'true',
        path:'/app/religion/edit/:id',
        element: lazy(()=>import('./views/community_caste/edit_religion'))
      },
      {
        exact:'true',
        path:'/app/community/create',
        element: lazy(()=>import('./views/community_caste/create_community'))
      },
      {
        exact:'true',
        path:'/app/community/view',
        element: lazy(()=>import('./views/community_caste/view_community'))
      },
      {
        exact:'true',
        path:'/app/community/edit/:id',
        element: lazy(()=>import('./views/community_caste/edit_community'))
      },

      {
        exact:'true',
        path:'/app/caste/create',
        element: lazy(()=>import('./views/community_caste/create_caste'))
      },
      {
        exact:'true',
        path:'/app/caste/view',
        element: lazy(()=>import('./views/community_caste/view_caste'))
      },
      {
        exact:'true',
        path:'/app/caste/edit/:id',
        element: lazy(()=>import('./views/community_caste/edit_caste'))
      },

      {
        exact:'true',
        path:'/app/subcaste/create',
        element: lazy(()=>import('./views/community_caste/create_subcaste'))
      },
      {
        exact:'true',
        path:'/app/subcaste/view',
        element: lazy(()=>import('./views/community_caste/view_subcaste'))
      },
      {
        exact:'true',
        path:'/app/subcaste/edit/:id',
        element: lazy(()=>import('./views/community_caste/edit_subcaste'))
      },
      /**OLD */
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
