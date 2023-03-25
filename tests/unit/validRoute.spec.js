// tests for valid route function

import InstructionsField from '@/components/ControlConsole/InstructionsField';

import { shallowMount } from '@vue/test-utils';

describe('isValidRoute', () => {
    const wrapper = shallowMount(InstructionsField, {
        global: {
            stubs: {
                'font-awesome-icon': {
                    template: '<span />'
                }
            }
        }
    });

    test('long valid route, named holding point', () => {        
        
        const route = 'A B C D E G H J K L M N P Q R S T U V W Y Z AN AS FR GR KA NA QA QB QC 08L/26R 08R/26L /J1'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(true);
    });

    test('valid route, stand', () => {

        const route = 'A AN C B D QA Q L K S35'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(true);
    });

    test('valid route, stand w letter', () => {

        const route = 'A AN C B D QA Q L K S33L'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(true);
    });

    test('valid route, maintenance area', () => {

        const route = 'A AN C B D QA Q L K MA2'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(true);
    });

    test('valid route, hold short', () => {

        const route = 'A AN C B D QA Q L K /H'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(true);
    });

    test('invalid route, double taxiway', () => {

        const route = 'A AN C B D QA Q LQ K S33L'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(false);
    });

    test('invalid route, single taxiway', () => {

        const route = 'A AN C B D QA Q I K S33'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(false);
    });

    test('invalid route, no terminator', () => {

        const route = 'A AN C B D QA Q K'.split(/\s+/g);
        const result = wrapper.vm.isValidRoute(route);

        expect(result).toBe(false);
    });
});