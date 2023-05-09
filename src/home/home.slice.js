import { createSlice, createSelector } from '@reduxjs/toolkit'
import { fetchWrapper } from '../_helpers'
import { logout } from './../account/account.slice'
import { startSpinner, stopSpinner } from '../app/spinner/spinner.slice'

export const getNodeId = () => (dispatch, getState) => {
    dispatch(startSpinner())
    fetchWrapper.get(`/api/node-id`).then(
        (data) => {
            dispatch(setNodeId(data))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            dispatch(logOutIfUnauthorised(status))
            dispatch(stopSpinner())
        }
    )
}

export const getRewards = () => (dispatch, getState) => {
    dispatch(startSpinner())
    fetchWrapper.get(`/api/rewards`).then(
        (data) => {
            dispatch(setInviteCode(data.inviteCode))
            dispatch(setDailyRewards(data.rewards.dailyRewards)) // {dailyRewards, previousRewards, lastPing}
            dispatch(setPreviousRewards(data.rewards.previousRewards))
            dispatch(setInviterRewards(data.rewards.inviterRewards))
            dispatch(setLastPing(data.lastPing))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            dispatch(logOutIfUnauthorised(status)) // TODO why does this sometimes fail?
            dispatch(stopSpinner())
        }
    )
}

export const logOutIfUnauthorised = (status) => (dispatch, getState) => {
    if ([401, 403].includes(status)) {
        dispatch(logout())
    }
}

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        nodeId: '337812371289371289371289',
        inviteCode: '33781237128937128',
        dailyRewards: 50,
        previousRewards: 10,
        inviterRewards: 15,
        lastPing: 1679049390568,
    },
    reducers: {
        setNodeId: (state, action) => {
            state.nodeId = action.payload
        },
        setInviteCode: (state, action) => {
            state.inviteCode = action.payload
        },
        setDailyRewards: (state, action) => {
            state.dailyRewards = action.payload
        },
        setPreviousRewards: (state, action) => {
            state.previousRewards = action.payload
        },
        setInviterRewards: (state, action) => {
            state.inviterRewards = action.payload
        },
        setLastPing: (state, action) => {
            state.lastPing = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setNodeId,
    setInviteCode,
    setDailyRewards,
    setPreviousRewards,
    setInviterRewards,
    setLastPing,
} = homeSlice.actions

export default homeSlice.reducer

///// selectors
const selectHome = (state) => state.home
export const selectNodeId = createSelector(selectHome, (state) => state.nodeId)
export const selectInviteCode = createSelector(selectHome, (state) => state.inviteCode)
export const selectDailyRewards = createSelector(selectHome, (state) => state.dailyRewards)
export const selectPreviousRewards = createSelector(selectHome, (state) => state.previousRewards)
export const selectInviterRewards = createSelector(selectHome, (state) => state.inviterRewards)
export const selectLastPing = createSelector(selectHome, (state) => state.lastPing)
