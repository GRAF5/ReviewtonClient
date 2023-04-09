import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { RouterProvider} from 'react-router';
import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { userClient } from './clients/user.client';
import ArticleFeed from './pages/article-feed/article-feed';
import CreateArticle from './pages/create-article/create-article';
import Account from './pages/account/account';
import { contentClient } from './clients/content.client';
import Subjects from './pages/subjects/subjects';
import Subject from './pages/subjects/subject';
import Tags from './pages/tags/tags';
import Tag from './pages/tags/tag';
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Body from './components/body/body';
import ArticleInfo from './pages/article/article-info';
import UpdateArticle from './pages/create-article/update-article';
import TermsOfUse from './pages/terms-of-use/terms-of-use';
import PrivacyPolicy from './pages/privacy-policy/privacy-policy';
import Subscriptions from './pages/account/subscriptions';
import ErrorBoundary from './components/error-boundary/error-boundary';

const App = observer(({userStore}) => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: 
        <Body userStore={userStore}/>,
      children: [
        {
          path: '/',
          element: 
          <ArticleFeed
            key={'new-art-feed'}
            pageName={'Нові відгуки'}
            user={userStore.user}
            receive={contentClient.getArticles} />
        },
        {
          path: 'subscriptions',
          element: 
          <ArticleFeed
            key={'subscriptions-art-feed'}
            pageName={'Підписки'}
            user={userStore.user}
            receive={contentClient.getArticlesBySubscriptions} />
        },
        {
          path: '/register',
          element: 
          <Register userStore={userStore} />
        },
        {
          path: '/login',
          element: 
          <Login userStore={userStore} />
        },
        {
          path: 'add-article',
          element: 
          <CreateArticle user={userStore.user} />
        },
        {
          path: 'users/:id',
          loader: async ({params, request}) => {
            return userClient.getUserById(params.id);
          },
          element: 
          <Account userStore={userStore} />
        },
        {
          path: 'subjects/:id',
          loader: async ({params, request}) => {
            return contentClient.getSubjectById(params.id);
          },
          element: 
          <Subject userStore={userStore} />
        },
        {
          path: 'tags/:id',
          loader: async ({params, request}) => {
            return contentClient.getTagById(params.id);
          },
          element: 
          <Tag userStore={userStore} />
        },
        {
          path: 'articles/:id',
          loader: async ({params, request}) => {
            return contentClient.getArticleById(params.id);
          },
          element: 
          <ArticleInfo user={userStore.user} />
        },
        {
          path: 'articles/change/:id',
          loader: async ({params, request}) => {
            return contentClient.getArticleById(params.id);
          },
          element: 
          <UpdateArticle user={userStore.user} />
        },
        {
          path: 'account/subscriptions',
          element: 
          <Subscriptions userStore={userStore} />
        },
        {
          path: 'subjects',
          element: 
          <Subjects />
        },
        {
          path: 'tags',
          element: 
          <Tags />
        },
        {
          path: 'terms-of-use',
          element:
          <TermsOfUse />
        },
        {
          path: 'privacy-policy',
          element:
          <PrivacyPolicy />
        }
      ],
      errorElement: <ErrorBoundary userStore={userStore} />
    }
  ]);

  useEffect(() => {
    userClient.current()
      .then(res => {
        userStore.setUser(res);
      });
  }, []);
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
});

export default App;
