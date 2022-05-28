# ByJuun.com 

## 🌟소개
<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/149630300-f3d9144a-788c-443c-aacd-b89fe098cb67.png" width = "250"></p> 
👨‍💻 개인 블로그 👨‍💻  
<br/>
<br/>
✨ 후기 : https://byjuun.com/post/70 (개발을 하며 겪은 고민과 결론, 느낀점, 아쉬운 점, 추가하고 싶은 기능 서술)

<br/>
<br/>
<p align = "center">
     🛠 Tech 🛠
</p>
    

<p align = "center">
    <img src="https://img.shields.io/badge/React-v17.0.2-blue?logo=React"/></a>
    <img src="https://img.shields.io/badge/TypeScript-v4.6.4-skyblue?logo=TypeScript&logoColor=skyblue"/></a>
    <img src="https://img.shields.io/badge/NextJs-v12.1.6-white?logo=Next.js&logoColor=white"/></a>
    <img src="https://img.shields.io/badge/ReactQuery-v3.39.0-FF4154?style=flat-square&logo=ReactQuery&logoColor=#FF4154"/></a>
</p>
<p align = "center">
    <img src="https://img.shields.io/badge/Express-v4.17.1-important?logo=Express&logoColor=orange"/></a>
    <img src="https://img.shields.io/badge/mysql2-v2.3.0-blue?logo=MySQL&logoColor=blue"/></a>
    <img src="https://img.shields.io/badge/Sequelize-v6.6.5-9cf?logo=Sequelize&logoColor=9cf"/></a>
    <img src="https://img.shields.io/badge/Passport-v0.4.1-green?logo=Passport&logoColor=green"/></a>
</p>


## 🌟 주요페이지 및 기능

### 😊 메인페이지
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170834560-3a1122fb-e609-409a-9520-d52d7764f694.png" width = "1300"> 
     
* 메인화면은 크게, 헤더, 컨텐츠 영역 그리고 하단의 페이지네이션 영역으로 나뉩니다.
* 헤더는 로그인, 회원가입, 로그아웃, 검색을 위한 메뉴들이 존재하는 영역입니다.  
* 컨텐츠 영역은 각 페이지에 맞게 서버에서 가져온 게시글들을 PostCard라는 컴포넌트를 재활용해 화면에 보여주는 영역입니다.
     
<br/>
<br/>   


### 😊 로그인 및 회원가입
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170835186-f0210c1e-4dfa-4ee8-b5af-b0e693c5255a.png" width = "1300"> 

* 이전 Version1에서는 로그인과 회원가입을 위한 페이지를 각각 따로 두었습니다.
* 제 블로그의 메인 기능이 로그인과 회원가입이 아니며, 저를 제외한 글을 보는 사람에 입장에서 로그인과 회원가입은 댓글을 달기 위한 것일뿐이므로 모달을 이용해 구현했습니다.
* 모달을 이용해 구현함으로서 얻은 장점은, 회원가입 및 로그인을 위해 페이지를 이동하지 않아도 되는 점과
* 로그인 및 회원가입을 하더라도, 이전에 보고있던 게시글이나 페이지를 그대로 이어서 볼 수 있다는 점입니다.    
* 모달의 경우 util 폴더에 모달의 껍데기를 만들어 놓고, 각 모달 컴포넌트에서 이에 children props를 통해 내용을 구성할 수 있도록 만들었습니다.

```javascript
     
interface Props {
  children: ReactChild | ReactChildren;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setOpen }: Props) => {
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className={styles.Modal}>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
     
```

<br/>
<br/>   


### 😊 페이지네이션
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170834789-398b84c3-6488-4a86-bd35-03e85873d5d9.png" width = "1300">
     
* 전체 게시글들과 각 카테고리별 게시글들을 가져오는 경우에는 페이지네이션을 이용하게 됩니다.
* 프론트에서는 현재 페이지를 state에 넣어 저장하고 이를 체크해 서버에 요청하게 되며, 서버에서는 페이지 당 16개의 게시글을 잘라서 보내주게 됩니다. 
* state를 통한 구현이기 때문에, 새로고침을 할 경우 1페이지로 가는 경우가 발생합니다.
* 이에 따라, URL의 query string을 이용한 구현을 고민해봤지만, 후에 게시글의 개수가 100개 이상이 되는 시점에 Pagination이 아닌 Infinite Scrolling 방식으로 변경할 예정이기 때문에, 현재는 state를 이용해 페이지를 카운팅 하도록 했습니다.
* 화면에는 현재 페이지에 맞는 게시글들을 서버로 부터 가져와 보여주게 됩니다.
     
```javascript
     
export const getMainPostsAPI = async (page: number) => {
  const { data } = await customAxios.get(`/posts/load/main/${page}`);
  return data;
};
     
export const useGetMainPost = (pageNum: number) => {
	return useQuery<Array<PostsType>>(["MainPosts", pageNum], () => getMainPostsAPI(pageNum), {
		retry: false,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
     
```
     
* 서버에서는 메인페이지 혹은 카테고리에 맞는 전체 게시글의 숫자를 보내주게 되는데, 이에 맞춰 적절한 페이지의 개수를 구성했습니다.

```javascript
     
export const getPostsNumAPI = async (category: string) => {
  if (category === undefined) return;
  const { data } = await customAxios.get(`/posts/load/length/${category}`);
  const { length } = data;
  if (length % POST_PER_PAGE === 0) return length / POST_PER_PAGE;
  else return Math.floor(length / POST_PER_PAGE) + 1;
};
     
export const useGetPostNum = (Category: string) => {
     return useQuery(["PostNum", Category], () => getPostsNumAPI(Category), {
          retry: false,
          staleTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
     });
};
     
```
<br/>
<br/>   

###  👨‍💻 카테고리, 검색 결과, 태그를 이용한 filtering
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170835501-1659d141-8b20-494f-ae33-37f3885aa77c.png" width = "1300">
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170835572-c1361496-9976-4f4f-b931-0c8b7862d0d0.png" width = "1300">
     
     
* Version2에서는 Version1과 달리 카테고리, 검색 결과, 태그에 따른 게시글 목록을 보여주는 페이지를 따로 구성하지 않고, /filter라는 하나의 페이지에서 query string을 이용해 구분할 수 있도록 해주었습니다. (ex, /filter?category=javascript, /filter?search=검색어, /filter?tag=내가찾는태그)
* 처음에는, 카테고리, 검색 결과, 태그에 따른 게시글들을 각각 다른페이지에서 보여줬었지만, 같은 화면 구성을 취하고 있고, 그 안에 들어가는 데이터만 조금씩 다른데 다른 페이지에서 보여준다는게 낭비라는 생각이 들었고, 그 결과 같은 페이지에서 query string에 따라 다른 결과를 보여주도록 했습니다.
     
```javascript
     
//페이지의 query에 따라 다른 요청을 보내고 그 결과 데이터를 페이지에 넣어줌.
const useGetPosts = ({ pageNum }: Props): ReturnTypes => {
  const { query } = useRouter();
  if (query.category) {
    const { data: CategoryPost, isLoading: categoryLoading } = useGetCategoryPosts(String(query.category), pageNum);
    return [CategoryPost, categoryLoading];
  } else if (query.search) {
    const { data: SearchPosts, isLoading: searchLoading } = useGetSearchPosts(String(query.search));
    return [SearchPosts, searchLoading];
  } else if (query.tag) {
    const { data: TagPost, isLoading: tagLoading } = useGetTagPosts(String(query.tag));
    return [TagPost, tagLoading];
  } else {
    return [[DummyPosts], true];
  }
};
     
```  

<br/>
<br/>   
     
###  👨‍💻 태그 기능
     
* Version1의 경우에도 해시태그 기능이 있었지만, 특정 역할을 하지는 않았습니다.
* Version2의 경우에는 태그 테이블을 데이터베이스에 따로 만들고, 해당 테이블을 게시글 테이블과 연결해, 태그와 게시글이 다대다 관계를 가질 수 있도록 만들었습니다.  
* 각 태그를 이용해 게시글을 검색할 수 있도록 만들었습니다.   

<br/>
<br/>   
     
###  👨‍💻 게시글 작성 및 수정

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170835959-9283f51f-0d7d-4e64-a2f8-a89a9d6cc883.png" width = "1300">

* 먼저 게시글 작성 및 수정 역시 하나의 페이지를 동시에 사용하며, query string을 통해 게시글 작성 모드인지, 수정 모드인지 판단할 수 있도록 만들었습니다. (/Write?mode=Write, /Write?mode=Edit?id=70) 
* 게시글 작성의 경우, 관리자만이 글을 작성할 수 있어야 하기 때문에, 관리자 여부를 판단해주는 Custom Hook을 사용했습니다.  
* 게시글은 크게 타이틀, 카테코리, 태그, 내용, 썸네일로 구성되며, 각각을 입력받아, 서버에 전송하게 됩니다.   
* 태그의 경우에는 Version1에서는 하나의 스트링을 받아, 이를 #을 기준으로 파싱한 뒤 서버에 전송하는 형태였지만,
* Version2에서는 입력 단계부터 form을 이용해 각각을 받아 배열에 저장하도록 만들었습니다.

<br/>
<br/>   

###  👨‍💻 게시글 보기

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170836434-51d6074b-b581-4d61-b2fa-06d5c3ed9239.png" width = "1300">

* 이번 Version2를 만들면서 어떤 기능이 있어야 다른 사람들이 조금 더 글을 편하게 볼 수 있을지 고민했습니다.
* 다른 여러 블로그 플랫폼을 살펴보았고, 그 결과 스크롤에 따른 헤더바 가리기와, 데크스탑에서만 볼 수 있는 주제별 사이드 메뉴바를 만들게 되었습니다.
* 헤더바 가리기에 경우에는, 이전 화면 위치와 현재 화면 위치의 비교를 통해, 화면을 아래로 내리는 상황에는 헤더를 가릴 수 있도록 만들었습니다. (전역 document 객체에 eventListner를 달아주는 방식 사용 -> Custom Hook으로 빼놓음) 
     
```javascript
const useHideHeader = (setHide: React.Dispatch<React.SetStateAction<boolean>>) => {
     const documentRef = useRef(typeof window !== 'object' ? null : document);
     const [pageY, setPageY] = useState(0);
     const router = useRouter();

     const throttle = (callback: () => void, waitTime: number) => {
          let timerId: null | NodeJS.Timeout = null;
          return (e: any) => {
               if (timerId) return;
               timerId = setTimeout(() => {
                    callback.call(this);
                    timerId = null;
               }, waitTime);
          };
     };

     const handleScroll = useCallback(() => {
          const { pageYOffset } = window;
          const deltaY = pageYOffset - pageY;
          const hide = pageYOffset !== 0 && deltaY >= 0;
          setHide(hide);
          setPageY(pageYOffset);
     }, [pageY]);

     const throttleScroll = throttle(handleScroll, 50);


     useEffect(() => {
          if (documentRef !== null && documentRef.current && router.route === '/post/[id]') {
               documentRef.current.addEventListener('scroll', throttleScroll);
               return () => documentRef?.current?.removeEventListener('scroll', throttleScroll);
          }
     }, [pageY, router.route]);
};
```
<br/>
<br/>
     
* 주제별 사이드 메뉴바는 전체 게시글 내용을 h1, h2, h3 태그를 가진 element들만 빼낸 후 배열에 넣고, 해당 element들을 화면의 위치 기준으로 정렬했습니다.
* h2, h3 태그의 경우에는 h1 태그의 하위 메뉴인 경우가 많기 때문에, h2, h3 태그들의 요소에는 margin-left를 넣어주어, 하위 메뉴라는 사실을 보여줄 수 있도록 했습니다.
* 이렇게 파싱한 각 태그배열을 화면에 보여주고, 각 요소에 onClick 콜백함수로 scrollIntoView 함수를 넣어주어, 클릭시 해당 위치로 이동할 수 있는 기능을 만들었습.

```javascript
const useGetTopicArr = (setTopicArr: React.Dispatch<React.SetStateAction<never[]>>) => {
  useEffect(() => {
    const $h1Tags = document.getElementsByTagName("h1");
    const $h2Tags = document.getElementsByTagName("h2");
    const $h3Tags = document.getElementsByTagName("h3");
    const tagArr = [];

    if ($h1Tags.length !== 0) {
      for (const tag of $h1Tags as HTMLCollection) {
        if (tag.innerText.length !== 1) {
          tagArr.push(tag);
        }
      }
    }

    if ($h2Tags.length !== 0) {
      for (const tag of $h2Tags as HTMLCollection) {
        if (tag.innerText.length !== 1) {
          tagArr.push(tag);
        }
      }
    }

    if ($h3Tags.length !== 0) {
      for (const tag of $h3Tags as HTMLCollection) {
        if (tag.innerText.length !== 1) {
          tagArr.push(tag);
        }
      }
    }

    tagArr.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    tagArr.shift();
    setTopicArr(tagArr as never);
  }, []);
};
     
const gotoTopic = useCallback(
     (topic: any) => () => {
          topic.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
     },
[]);
```
     
    
* 추가로 사이드바의 경우에는, position : sticky 를 적용해, 처음에는 게시글 내용 옆에 위치하고, 사용자가 스크롤을 아래로 내리면, position : fixed와 같이 따라 갈 수 있도록 만들었습니다.
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/170836982-abdc1ea9-bbe3-4c36-b9d9-5a825f385a75.png" width = "1300">



###  👨‍💻 게시글 SEO

* 다른 페이지의 경우 SSR을 사용하지 않았지만, 게시글 페이지의 경우에는 NextJs의 getServerSideProps와 React Query의 prefetchQuery를 이용해 SSR방식을 구현했습니다.
* 추가로 동적으로 meta tag를 생성할 수 있도록 만들었습니다.
     
이외 내용 추후 추가

