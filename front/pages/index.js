import React,{useState,useCallback} from 'react';
import AppLayout from "../components/AppLayout";
import { useSelector} from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from "../store/configureStore";
import { END } from 'redux-saga';
import axios from 'axios'
import { Pagination } from 'antd';
import ListComponent from '../components/ListComponent';

const Home = () => {
  const { Posts } = useSelector((state) => (state.post));
  const [current,setCurrent] = useState(1);
  let startIndex = 0; 
  let lastIndex = 11;
  const [showPosts, setShowPosts] = useState(Posts.slice(startIndex,lastIndex));

  const onChange = useCallback(page => {
    setCurrent(page);
    startIndex = (page-1) * 11;
    lastIndex = startIndex + 11;
    setShowPosts(Posts.slice(startIndex,lastIndex));
},[current,showPosts]);

  return (
    <AppLayout>
      <ListComponent Posts = {showPosts}/>
      <div style = {{marginBottom : "15px"}}></div>
      <Pagination style = {{textAlign : "center", marginTop : "20px", marginBottom : "15px"}} current={current} onChange={onChange} total={Posts.length-1} />
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;