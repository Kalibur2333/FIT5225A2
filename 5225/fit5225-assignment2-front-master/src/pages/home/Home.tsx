import React from 'react';
import './home.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
// Pages
import UploadPic from './uploadPic/UploadPic';
import UploadTag from './uploadTag/UploadTag';
import Detect from './detect/Detect';
import Welcome from './welcome/Welcome';
import Management from './management/Management';
// Components
import BreadCrumb from '../../components/home/BreadCrumb';
import TopHeader from '../../components/home/TopHeader';
import NavBar from '../../components/home/NavBar';

const { Content, Footer } = Layout;

function Home() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <Layout className="site-layout">
        <TopHeader />

        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <BreadCrumb />
          {/* All the content should inside the following div*/}
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Switch>
              <Route path="/upload-pic" component={Detect} />
              <Route path="/search/by-pic" component={UploadPic} />
              <Route path="/search/by-tag" component={UploadTag} />
              <Route path="/management" component={Management} />
              <Route path="/welcome" component={Welcome} />
              <Redirect from="/" to="/welcome" />
            </Switch>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          FIT5225 Assignment2 Group
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
