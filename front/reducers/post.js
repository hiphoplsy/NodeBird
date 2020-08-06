import shortId from 'shortid';
import produce from 'immer';

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '맑쇼',
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [{
      id: shortId.generate(),
      src: 'https://1.bp.blogspot.com/-f6Vwn0m8ZQ4/Xx306Ir9G0I/AAAAAAAQDxY/ukuThlccT8cYTI0z5OVLgG2Yut_hm3w-wCLcBGAsYHQ/s1600/1.gif',
    }, {
      id: shortId.generate(),
      src: 'https://1.bp.blogspot.com/-HuyvtWglI40/Xx306KuI1FI/AAAAAAAQDxg/IBKna7DGbTEtnDkuV8oXOLjGVHgACRHUQCLcBGAsYHQ/s1600/2.gif',
    }, {
      id: shortId.generate(),
      src: 'https://2.bp.blogspot.com/-KXNtJILnG7o/XvRTXpMAyWI/AAAAAAAAHsI/OW2Wn__8aO0E6HqIiWTvX8vsMAif-_SJwCLcBGAsYHQ/s1600/ggoorr.net_001.gif',
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔음',
    }, {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'cat',
      },
      content: '우와 쩐다',
    }],
  }],
  imagePaths: [],
  addPostLoading: false, // 포스트 추가 시도중
  addPostDone: false,
  addPostError: null,
  removePostLoading: false, // 포스트 삭제 시도중
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false, // 댓글 추가 시도중
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '맑쇼',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '맑쇼',
  },
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    //   const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
    //   const post = { ...state.mainPosts[postIndex] };
    //   post.Comments = [dummyComment(action.data.content), ...post.Comments];
    //   const mainPosts = [...state.mainPosts];
    //   mainPosts[postIndex] = post;
    //   return {
    //     ...state,
    //     mainPosts,
    //     addCommentLoading: false,
    //     addCommentDone: true,
    //   };
    // }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
