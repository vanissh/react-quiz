import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Layout extends Component {

    state = {
        menu: false,
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    render(){
        return (
            <div className={classes.Layout}>
                { this.state.menu ? <Backdrop onClick={this.toggleMenuHandler}/> : null }
                <Drawer
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout