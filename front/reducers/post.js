export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://1.bp.blogspot.com/-f6Vwn0m8ZQ4/Xx306Ir9G0I/AAAAAAAQDxY/ukuThlccT8cYTI0z5OVLgG2Yut_hm3w-wCLcBGAsYHQ/s1600/1.gif',
    }, {
      src: 'https://1.bp.blogspot.com/-HuyvtWglI40/Xx306KuI1FI/AAAAAAAQDxg/IBKna7DGbTEtnDkuV8oXOLjGVHgACRHUQCLcBGAsYHQ/s1600/2.gif',
    }, {  
      src: 'https://2.bp.blogspot.com/-KXNtJILnG7o/XvRTXpMAyWI/AAAAAAAAHsI/OW2Wn__8aO0E6HqIiWTvX8vsMAif-_SJwCLcBGAsYHQ/s1600/ggoorr.net_001.gif',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: "우와 개정판이 나왔음"
    }, {
      User: {
        nickname: 'cat',
      },
      content: '우와 쩐다'
    }]
  }],
  imagePaths: [],
  postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
}

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }
    default:
      return state;    
  }
}

export default reducer;