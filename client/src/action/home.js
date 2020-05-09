import { HomeActionType } from "service/actionType"

export const getHomePageDetails = (query) => (dispatch, getState, { api }) => {

    return new Promise((resolve, reject) => {

        dispatch({ type: HomeActionType.updateHomePageData, payload: 'test' })


    })
}