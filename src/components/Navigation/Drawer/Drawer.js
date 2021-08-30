import React from 'react'
import Backdrop from '../../UI/Button/Backdrop/Backdrop'
import classes from './Drawer.module.css'

const links = [
    1, 2, 3
]

class Drawer extends React.Component {

    renderLinks = () => {
        return links.map((link, index) => {
                return (
                  <li key={index}>
                      <a>
                          { link }
                      </a>
                  </li>  
                )
            })
    }

    

    render(){
        const cls = [classes.Drawer];

        if(!this.props.isOpen){
            cls.push(classes.close)
        }

        return(
            <nav className={cls.join(' ')}>
                <ul>
                    { this.renderLinks() }
                </ul>
            </nav>
        )
    }
}

export default Drawer