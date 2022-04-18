import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from 'dva/router'
import TopNav, {TopNavButton} from '@alicloud/console-base-rc-top-nav'
import logo from './logo.png';

ReactDOM.render(
    <HashRouter>
        <div className="App">
            <TopNav {...{
                id: 'consoleBaseTopbarRoot',
                // dock: {
                //     onClick() {
                //         console.info('只有含 onXx 或 href 才可以展示');
                //     }
                // },
                logo: {
                    label: <img
                        src={logo}
                        height="25%"
                        alt=""/>
                },
                menus: [{
                    // key: 'b-a',
                    // label: '备案',
                    // href: '/b-a'
                }],
                account: null,
                // account: {
                //     avatar: 'https://img.alicdn.com/imgextra/i3/2228361831/O1CN01E9EAfp1POdoYo8idF_!!2228361831.jpg',
                //     dropdown: {
                //         minWidth: 300,
                //         maxWidth: 480,
                //         header: 'header',
                //         body: <img alt=""
                //                    src="https://img.alicdn.com/imgextra/i4/3265150369/O1CN01ePEY7G1Eb2lftCrqg_!!3265150369.jpg"
                //                    style={{maxWidth: '100%'}}/>,
                //         footer: 'footer'
                //     }
                // },
                // customLeft: <>
                //     <TopNavButton {...{
                //         spm: 'l1',
                //         force: true,
                //         label: <span style={{color: 'red'}}>L1</span>
                //     }} />
                //     <div style={{color: 'green'}}>L2</div>
                // </>,
                // customRight: <>
                //     <div style={{color: 'purple'}}>R1</div>
                //     <div style={{color: 'pink'}}>R2</div>
                // </>
            }} />
            <App/>
        </div>
    </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

