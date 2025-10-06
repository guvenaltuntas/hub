import { Router } from '@vaadin/router';

let routerInstance;

export const initRouter = (outlet) => {
    if (!routerInstance) {
        routerInstance = new Router(outlet);
        routerInstance.setRoutes([
            {
                path: '/',
                action: (context, commands) => {
                    return commands.redirect('/employee-list');
                }
            },
            {
                path: '/employee-list',
                component: 'employee-list',
                action: async ()=> {
                    return await import('./components/employee-list/employee-list.component.js')
                }
            },
            {
                path: '/employee-list/:pageNo',
                component: 'employee-list',
                action: async ()=> {
                    return await import('./components/employee-list/employee-list.component.js')
                }
            },
            {
                path: '/employee',
                component: 'employee-form',
                action: async ()=> {
                    return await import('./components/employee-form/employee-form.component.js')
                }
            },
            {
                path: '/employee/:id',
                component: 'employee-form',
                action: async ()=> {
                    return await import('./components/employee-form/employee-form.component.js')
                }
            }
        ]);
    }

    return routerInstance;
};