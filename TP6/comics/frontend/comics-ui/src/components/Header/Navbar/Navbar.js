import React from 'react';

import {Menubar} from 'primereact/menubar';
import './css/style.css'

export default function Navbar() {
    const menuItems = [
      {
        label: null,
        icon: 'pi pi-home',
        url: '/home',
      },
      {
        label: null, 
        icon: 'fa fa-dc', 
        items: [
          {label:"New", icon: 'pi pi-fw pi-plus', url: '/dc/new'},
          {label:"Edit", icon: 'pi pi-fw pi-pencil', url: '/dc/edit'},
          {label:"Delete", icon: 'pi pi-fw pi-trash', url: '/dc/delete'},
        ]},
      {
        label: null, icon: 'fa fa-marvel',
        items: [
          {label:"New", icon: 'pi pi-fw pi-plus', url: '/marvel/new'},
          {label:"Edit", icon: 'pi pi-fw pi-pencil', url: '/marvel/edit'},
          {label:"Delete", icon: 'pi pi-fw pi-trash', url: '/marvel/delete'},
        ]
      }
    ]

    return (
      <nav className="m5">
        <Menubar className='ui-menuitem' model={menuItems}/>
      </nav>
   )
}


      