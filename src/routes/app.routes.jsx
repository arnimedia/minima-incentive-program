import React from 'react'
import { Login } from '../account/Login'
import { Register } from '../account/Register'
import { RegistratonVerifyEmail } from '../account/RegistratonVerifyEmail'
import { ForgotPassword } from '../account/ForgotPassword'
import PasswordResetContainer from '../account/password-reset/PasswordResetContainer'
import AccountLayout from '../account/AccountLayout'
import MainLayout from './../_components/MainLayout'
import { GetStarted } from '../home/pages/GetStarted'
import { GetStartedAndroid } from '../home/pages/GetStartedAndroid'
import { GetStartedWindows } from '../home/pages/GetStartedWindows'
import { GetStartedMac } from '../home/pages/GetStartedMac'
import { GetStartedLinux} from '../home/pages/GetStartedLinux'
import { GetStartedVPS } from '../home/pages/GetStartedVPS'
import { IncentiveID } from '../home/pages/IncentiveID'
import { InviteLink } from '../home/pages/InviteLink'
import { RewardsPage } from '../home/pages/RewardsPage'

const AppRoutes = [
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <GetStarted></GetStarted>,
            },
            { 
                path: 'home/pages/get-started',
                element: <GetStarted></GetStarted>,
            },
            {
                path: 'home/pages/get-started-android',
                element: <GetStartedAndroid></GetStartedAndroid>,
            },
            {
                path: 'home/pages/get-started-windows',
                element: <GetStartedWindows></GetStartedWindows>,
            },
            {
                path: 'home/pages/get-started-mac',
                element: <GetStartedMac></GetStartedMac>,
            },
            {
                path: 'home/pages/get-started-linux',
                element: <GetStartedLinux></GetStartedLinux>,
            },
            {
                path: 'home/pages/get-started-linuxvps',
                element: <GetStartedVPS></GetStartedVPS>,
            },
            {
                path: 'home/pages/incentiveid',
                element: <IncentiveID></IncentiveID>,
            },
            {
                path: 'home/pages/invite-link',
                element: <InviteLink></InviteLink>,
            },
            {
                path: 'home/pages/rewards',
                element: <RewardsPage></RewardsPage>,
            },
        ],
    },
    {
        path: 'account',
        element: <AccountLayout></AccountLayout>,
        children: [
            {
                index: true,
                element: <Login></Login>,
            },
            {
                path: 'login',
                element: <Login></Login>,
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
            {
                path: 'registration-verify-email',
                element: <RegistratonVerifyEmail></RegistratonVerifyEmail>,
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: 'reset-password',
                element: <PasswordResetContainer></PasswordResetContainer>,
            },
        ],
    },
]

export default AppRoutes
