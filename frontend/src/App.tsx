import './App.css'
import { Avatar, Button, Col, Layout, Row, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
//import LoginForm from "./components/LoginForm.tsx";
import MyTable from "./components/Table.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const {Text} = Typography;
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout
                style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'whitesmoke'}}>
                <Header style={{padding: "10px 10px 10px 10xp"}}>
                    <Row>
                        <Col span={12}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            <Text style={{color: "white"}}>@Username</Text>
                        </Col>
                        <Col span={12} style={{display: "flex", justifyContent: "end"}}>
                            <Space>
                                <Button type="primary">Registration</Button>
                                <Button>Login</Button>
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content style={{backgroundColor: "white", margin: '50px 50px 50px 50px'}}>
                    <Row>
                        <Col span={24}
                             style={{display: "flex", justifyContent: "center", padding: "10px 10px 10px 10px"}}>
                            <RegistrationForm/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <MyTable/>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{textAlign: 'center', background: '#f0f2f5'}}>
                    jwt authorization example ©2024
                </Footer>
            </Layout>
        </QueryClientProvider>
    )
}

export default App
