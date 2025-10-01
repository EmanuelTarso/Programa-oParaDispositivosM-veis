import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { router } from 'expo-router';


export default function TopMenu(){

    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
    <Appbar.Header>
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="menu" color="black" onPress={openMenu} />}
        >
            <Menu.Item onPress={() => router.push('/relogio')} title="Tela Relógio" />
            <Menu.Item onPress={() => router.push('/telaB')} title="Tela B" />
            <Menu.Item onPress={() => router.push('/')} title="Menu" />
        </Menu>
        <Appbar.Content title="Meu App" />
    </Appbar.Header>
    )
}