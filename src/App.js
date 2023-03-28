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

const App = observer(({userStore}) => {

  // const R = <Routes>
  //   <Route path='/' element={
  //     <ArticleFeed 
  //       pageName={'Нові'} 
  //       filter={searchParams.get('filter')} 
  //       user={userStore.user} 
  //       receive={contentClient.getArticles}/>} />
  //   <Route path='/register' element={<Register/>} />
  //   <Route path='/login' element={<Login userStore={userStore}/>} />
  //   <Route path='add-article' element={<CreateArticle user={userStore.user} />}/>
  //   <Route path='users/:id' element={<Account user={userStore.user} />} />
  //   <Route path='subjects' element={<Subjects />} />
  //   <Route path='subjects/:id' element={<Subject user={userStore.user} />} />
  //   <Route path='tags' element={<Tags />} />
  //   <Route path='tags/:id' element={<Tag user={userStore.user} />} />
  // </Routes>;
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
            pageName={'Нові відгуки'}
            user={userStore.user}
            receive={contentClient.getArticles} />
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
          element: 
          <Account user={userStore.user} />
        },
        {
          path: 'subjects/:id',
          element: 
          <Subject user={userStore.user} />
        },
        {
          path: 'tags/:id',
          element: 
          <Tag user={userStore.user} />
        },
        {
          path: 'articles/:id',
          element: 
          <ArticleInfo user={userStore.user} />
        },
        {
          path: 'articles/change/:id',
          element: 
          <UpdateArticle user={userStore.user} />
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
        }
      ]
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
