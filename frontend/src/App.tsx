import './App.css'
import { Avatar, Button, Col, Layout, Row, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import MyTable from "./components/Table.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import { OpenRegisterModalButton } from "./components/OpenRegisterModalButton";
import LoginForm from "./components/LoginForm.tsx";
import { OpenLoginModalButton } from "./components/OpenLoginModalButton.tsx";
import { useAuthStore } from "./store/useAuthStore.ts";
import { useAuth } from "./hooks/UseAuth.ts";
import { useEffect } from "react";

const {Text} = Typography;

function App() {
    // @ts-ignore
    const { isAuth, clearAuth, email } = useAuthStore();
    const { logoutMutation, checkAuth } = useAuth();
    const { data: user, isLoading, error } = checkAuth;

    const onLogout = () => {
        logoutMutation.mutate();
        clearAuth();
    };

    useEffect(() => {
        if(isAuth)checkAuth.refetch();
    }, []);

    return (
        <Layout style={{ minWidth: '670px', minHeight: '100vh', backgroundColor: 'whitesmoke' }}>
            <Header style={{
                padding: "10px 10px 10px 10xp", position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Row style={{ width: '100%' }}>
                    <Col span={12} style={{display: "flex", justifyContent: "start"}}>
                        {isAuth && (
                            <Space>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <Text style={{ color: "white", fontWeight: 'bold' }}>{email}</Text>
                            </Space>
                        )}
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
                        {isAuth ? (
                            <Space>
                                <Button onClick={onLogout}>Logout</Button>
                            </Space>
                        ) : (
                            <Space>
                                <OpenRegisterModalButton />
                                <OpenLoginModalButton />
                            </Space>
                        )}
                    </Col>
                </Row>
            </Header>

            <Content style={{ backgroundColor: "white", margin: '50px' }}>
                <Row>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                        <RegistrationForm />
                        <LoginForm />
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        {isAuth && <MyTable />}

                        {isAuth && isLoading && <p>Загрузка...</p>}

                        {isAuth && error && <p>Ошибка загрузки</p>}

                        {isAuth && user && (
                            <div>
                                <p>Email: {user.data.email}</p>
                                <p>ID: {user.data.id}</p>
                                <p>Активирован: {user.data.isActivate ? 'Да' : 'Нет'}</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
                jwt authorization example ©2025
            </Footer>
        </Layout>
    );
}

export default App
