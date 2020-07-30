export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://1.bp.blogspot.com/-hEmIjFJENG0/Xx-mSSBn0BI/AAAAAAAAN2I/Qy26ZZbtRUsHGG5HFsx3z1L_Bvw68XqYQCLcBGAsYHQ/d/Monroe6.gif',
    }, {
      src: 'https://1.bp.blogspot.com/-7WRM9vO7UEA/XxgrSiVCglI/AAAAAAAANes/pJMAOejNVtYxZVEBUyNfXcLrzxpc9FEIwCLcBGAsYHQ/d/Titty7.gif',
    }, {  
      src: 'https://1.bp.blogspot.com/-9ncsEZy2RbI/Xxg90DRzGPI/AAAAAAAANfk/ZhCD7xdAZoQ0X9LUN0e8sIY_uC2TWxESQCLcBGAsYHQ/d/spreading5.gif',
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