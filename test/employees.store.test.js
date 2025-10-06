import { expect } from '@open-wc/testing';
import { employeesStore, add, update, remove } from '../src/store/employees.store.js';

describe('Redux store', () => {

    afterEach(() => {
        const state = employeesStore.getState().employeeList;
        state.slice().forEach(e => employeesStore.dispatch(remove(e.id)));
    });

    it('should add', () => {
        const payload = { firstName: 'Güven', lastName: 'Altuntaş' };
        employeesStore.dispatch(add(payload));
        const state = employeesStore.getState().employeeList;
        const added = state.find(e => e.firstName === 'Güven' && e.lastName === 'Altuntaş');
        expect(added).to.exist;
    });

    it('should update', () => {
        const payload = { firstName: 'Güven', lastName: 'Altuntaş' };
        employeesStore.dispatch(add(payload));

        const employee = employeesStore.getState().employeeList.find(e => e.firstName === 'Güven');

        employeesStore.dispatch(update({ id: employee.id, patch: { department: 'Tech' } }));
        
        const updated = employeesStore.getState().employeeList.find(e => e.id === employee.id);
        expect(updated.department).to.equal('Tech');
    });

    it('should remove', () => {
        const payload = { firstName: 'Güven', lastName: 'Altuntaş' };
        employeesStore.dispatch(add(payload));

        const employee = employeesStore.getState().employeeList.find(e => e.firstName === 'Güven');

        employeesStore.dispatch(remove(employee.id));

        const state = employeesStore.getState().employeeList;
        const removed = state.find(e => e.id === employee.id);
        expect(removed).to.be.undefined;
    });

});
