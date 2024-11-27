import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

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
        path:'/app/states',
        element: lazy(()=>import('./views/states'))
      },
      {
        exact:'true',
        path:'/app/districts',
        element: lazy(()=>import('./views/districts'))
      },
      {
        exact:'true',
        path:'/app/loksaba/create',
        element: lazy(()=>import('./views/loksabha_constituency/create'))
      },
      {
        exact:'true',
        path:'/app/loksaba',
        element: lazy(()=>import('./views/loksabha_constituency/index'))
      },
      {
        exact:'true',
        path:'/app/leg_constituency',
        element: lazy(()=>import('./views/legislative_constituency'))
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
        path:'/app/voters/import',
        element: lazy(()=>import('./views/voters/import'))
      },
      {
        exact:'true',
        path:'/app/voters/export',
        element: lazy(()=>import('./views/voters/export'))
      },
      {
        exact:'true',
        path:'/app/voters/import',
        element: lazy(()=>import('./views/voters'))
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
