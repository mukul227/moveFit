import produce from 'immer';
import {
    AUTH_USER_FOLLOW_LIST_TYPE,
    FOLLOW_LIST_TYPE,
    SET_ACHIEVEMENT,
    SET_ARE_POSTS_LOADING, SET_FOLLOW_USERS,
    SET_POST_IMAGE, SET_USER_ACHIEVEMENTS, SET_USER_ARRAY,
    SET_USER_POSTS,
    SET_USER_POSTS_FROM_CREATE, SHOW_ACHIEVEMENTS_CONFETTI
} from './actionTypes';
import {SET_ALL_USERS} from "../friends/actionTypes";

const initialState = {
    image: null,
    posts: {
        data: [],
        limit: 18,
        page: 1,
        total: 0,
        isLoading: true
    },
    userAchievements:[],
    achievement: null,
    achievementConfetti: false,
    followListType:'',
    authUserFollowListType:'',
    followUsers: [],
    userArray: []
};

function reducer(state = initialState, { type, payload }) {
    return produce(state, (draft) => {
        /*eslint-disable indent */
        switch (type) {
            case SET_POST_IMAGE:
                draft.image = payload;
                break;
          case SET_USER_ARRAY:
            draft.userArray = payload;
            break;
          case SET_USER_POSTS_FROM_CREATE:
                draft.posts = payload;
                break;

            case SET_USER_POSTS:
                draft.posts = {
                    limit: payload.limit,
                    page: payload.page,
                    total: payload.totalDocs,
                    data:
                        payload.page === 1
                        ? payload.docs
                        : [...draft.posts.data, ...payload.docs],
                    isLoading: false,
                };
                break;

            case SET_ARE_POSTS_LOADING:
                draft.posts.isLoading = payload;
                break;
            case SET_USER_ACHIEVEMENTS:
                draft.userAchievements = payload;
                break;
            case SET_ACHIEVEMENT:
                draft.achievement = payload;
                break;
            case SHOW_ACHIEVEMENTS_CONFETTI:
                draft.achievementConfetti = payload;
                break;
            case FOLLOW_LIST_TYPE:
                draft.followListType = payload;
                break;
            case AUTH_USER_FOLLOW_LIST_TYPE:
                draft.authUserFollowListType = payload;
                break;
            case SET_FOLLOW_USERS:
                draft.followUsers = {
                    limit: payload.limit,
                    page: payload.page,
                    total: payload.totalDocs,
                    data:
                        payload.page === 1
                            ? payload.arr
                            : [...draft.followUsers.data, ...payload.arr],
                    isLoading: false,
                };
                break;
            case SET_ALL_USERS:
                draft.allUsers = {
                    limit: payload.limit,
                    page: payload.page,
                    total: payload.totalDocs,
                    data:
                        payload.page === 1
                            ? payload.docs
                            : [...draft.allUsers.data, ...payload.docs],
                    isLoading: false,
                };
                break;

        }
    });
}

export default reducer;
