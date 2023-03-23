import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/header/header';
import SideMenu from './components/side-menu/side-menu';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { userClient } from './clients/user.client';
import useWindowSize from './utils/useWindowSize';
import ArticleFeed from './pages/article-feed/article-feed';
import CreateArticle from './pages/create-article/create-article';
import Account from './pages/account/account';
import { contentClient } from './clients/content.client';
import Subjects from './pages/subjects/subjects';
import Subject from './pages/subjects/subject';
import Tags from './pages/tags/tags';
import Tag from './pages/tags/tag';
import { useSearchParams } from 'react-router-dom';

const App = observer(({userStore}) => {
  let [searchParams] = useSearchParams();
  const {width, contentWidth} = useWindowSize();

  const R = <Routes>
    <Route path='/' element={<ArticleFeed pageName={'Нові'} filter={searchParams.get('filter')} user={userStore.user} receive={contentClient.getArticles}/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login userStore={userStore}/>} />
    <Route path='add-article' element={<CreateArticle user={userStore.user} />}/>
    <Route path='users/:id' element={<Account user={userStore.user} />} />
    <Route path='subjects' element={<Subjects />} />
    <Route path='subjects/:id' element={<Subject user={userStore.user} />} />
    <Route path='tags' element={<Tags />} />
    <Route path='tags/:id' element={<Tag user={userStore.user} />} />
  </Routes>;

  useEffect(() => {
    userClient.current()
      .then(res => {
        userStore.setUser(res);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='App'>
      <div className='Body'>
        <Header userStore={userStore} />
        <div className='body-left-side'>
          <div style={width >= 1276 ?{
            'width': '340px',
            'height': '100%',
            'overflow': 'auto',
            'display': 'grid'
          }:{
            'height': '100%',
            'overflow': 'auto',
            'display': 'grid'}}>
            <SideMenu userStore={userStore}/>
          </div>
        </div>
        <div className={width >= 1276 ? 'body-right-side' : 'body-right-side-adaptive'}>
          <div className='content-wrapper' 
            style={{
            'marginLeft': width >= 1276 ? `${(width - contentWidth) / 2 - 340}px` : `${(width - contentWidth) / 2}px`,
            'width': `${contentWidth - 40}px`}}>
            {R}
          </div>
        </div>
      </div>
    </div>
  );
})

export default App;
